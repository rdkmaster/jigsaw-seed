import {Component} from '@angular/core';
import {JigsawTheme, MajorStyle} from '@rdkmaster/jigsaw';

@Component({
    selector: 'jigsaw-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    mixingTheme = 'light';
    title = 'Jigsaw Seed';
    headerBg = '#fff';

    constructor() {
        this.changeTheme('dark');
    }

    gotoTourist() {
        window.open('https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md', '_blank');
    }

    gotoGithub() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }

    changeTheme(style: MajorStyle) {
        JigsawTheme.changeTheme('paletx-pro', style);
        this.mixingTheme = style == 'light' ? 'dark' : 'light';
        this.headerBg = style == 'light' ? '#181a2a' : '#fff';
    }
}
