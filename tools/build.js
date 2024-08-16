const fs = require('fs-extra');
const {execSync, spawn} = require("child_process");
const chokidar = require("chokidar");
const path = require("path");
const processSource = require("../node_modules/@rdkmaster/jigsaw/tools/create-tmp-src");
const generateGetterSetter = require('../node_modules/@rdkmaster/jigsaw/tools/generate-getter-setter.js');

const buildMode = process.argv[2];
if (buildMode !== 'prod' && buildMode !== 'dev') {
    printUsage(`无效的输出类型"${buildMode}"，必须是 prod/dev 之一`);
    process.exit(1);
}

console.log(`building app in ${buildMode} mode ...`);
process.chdir(path.join(__dirname, '../'));

processSource();
generateGetterSetter(['src-tmp']);

if (buildMode === 'dev') {
    watchFiles();
    runNgServe();
} else {
    runNgBuild();
}

function exec(cmd) {
    try {
        execSync(cmd, {stdio: 'inherit'});
        return 0;
    } catch (e) {
        return e.status;
    }
}

function watchFiles() {
    console.log('watching files ....');
    const dirs = [
        'src'
    ];
    const watcher = chokidar.watch(dirs, {
        ignored: [/.*\.(.*___jb_\w+___|gitkeep)$/, `**/node_modules/**`, `**/mock-data/**`, '**/dist/**'],
        persistent: true, awaitWriteFinish: {stabilityThreshold: 100, pollInterval: 100}
    });
    let isInitialScanComplete = false;
    const callback = debouncePathChange(function (paths) {
        // 初始化的时候会触发一次全量文件的change，需要过滤掉，不然会影响ng serve的编译
        if (!isInitialScanComplete) {
            isInitialScanComplete = true;
            return;
        }
        const tmpTsPaths = [];
        paths.forEach(pt => {
            const tmpPath = path.join(pt.replace(/^src[\/\\]/, 'src-tmp/'));
            console.log(`====Copy file ${pt} to ${tmpPath}`);
            fs.copySync(pt, tmpPath);
            if (path.extname(tmpPath).toLowerCase() == '.ts') {
                tmpTsPaths.push(tmpPath);
            }
        })
        generateGetterSetter(tmpTsPaths);
    }, 2000);

    const callbackUnlink = debouncePathChange(function (paths) {
        console.log('removed paths: ', paths.join('\n'));
        paths.forEach(pt => {
            const tmpPath = path.join(pt.replace(/[\/\\]src[\/\\]/, '/src-tmp/'));
            fs.removeSync(tmpPath);
        })
    }, 2000);
    watcher.on('ready', () => {
        console.log('Initial scan complete. Ready for changes.');
    }).on('add', callback).on('change', callback).on('unlink', callbackUnlink);
}

function debouncePathChange(func, wait) {
    let timeout, paths = [];
    return function (path) {
        paths.push(path);
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            func.apply(this, [paths]);
            paths = [];
        }, wait);
    };
}

function runNgServe() {
    const port = process.argv[3] || 4200;
    const ngServeParams = ['serve', '--poll', '500', '--disable-host-check', '--host', '0.0.0.0',
        '--port', port, '--proxy-config', 'proxy-config.json'];
    console.log('running ng serve in spawn ...');
    const ngServe = spawn('node', [
        '--max_old_space_size=4096',
        'node_modules/@angular/cli/bin/ng',
        ...ngServeParams
    ])

    ngServe.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    ngServe.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    ngServe.on('close', (code) => {
        process.stdout.write(`子进程退出，退出码 ${code}`);
    });
}

function runNgBuild() {
    const code = exec(`node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build ` +
        `--aot --prod --base-href /lui/web/ --configuration=ume`);
    process.exit(code);
}

function printUsage(extra) {
    console.error('Error:', extra);
    console.error('用法');
    console.error(' - 生成环境编译：node tools/build.js prod');
    console.error(' - 开发环境编译：node tools/build.js dev');
}
