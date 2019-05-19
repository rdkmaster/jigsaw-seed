# Jigsaw Seed

这是组件库[Jigsaw](https://github.com/rdkmaster/jigsaw)的种子工程，适用于开发**桌面端浅色系**的app，建议所有新增的app都以这个工程作为种子开始构建。[具体步骤看这里](http://rdk.zte.com.cn/components/guide/quick-start)。

**所有可用的种子工程**

终端 | 色系 | 链接
-----|-----|-----
桌面端 | 浅色系 | [仓库](https://github.com/rdkmaster/jigsaw-seed) / [直接下载](https://github.com/rdkmaster/jigsaw-seed/archive/master.zip)
桌面端 | 深色系 | [仓库](https://github.com/rdkmaster/jigsaw-seed-dark) / [直接下载](https://github.com/rdkmaster/jigsaw-seed-dark/archive/master.zip)
移动端 | 浅色系 | [仓库](https://github.com/rdkmaster/jigsaw-seed-mobile) / [直接下载](https://github.com/rdkmaster/jigsaw-seed-mobile/archive/master.zip)
移动端 | 深色系 | [仓库](https://github.com/rdkmaster/jigsaw-seed-dark-mobile) / [直接下载](https://github.com/rdkmaster/jigsaw-seed-dark-mobile/archive/master.zip)


**关于cnpm安装的依赖编译失败的说明**

重要提示：
1. 别用`cnpm`安装依赖，务必使用原生`npm`安装依赖！
2. 别用`cnpm`安装依赖，务必使用原生`npm`安装依赖！
3. 别用`cnpm`安装依赖，务必使用原生`npm`安装依赖！

虽然不能使用`cnpm`安装依赖，但是可以使用淘宝镜像加速，方法如下：

```
cd jigsaw-seed # 请改为实际目录
npm install --registry=https://registry.npm.taobao.org
```

> 不能使用`cnpm`安装依赖的原因[在这里](https://github.com/cnpm/cnpmjs.org/issues/1463)，感兴趣可以过去点个赞一下，促进cnpm改进。