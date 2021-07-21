import {Component} from '@angular/core';
import {JigsawTheme, MajorStyle} from '@rdkmaster/jigsaw';

@Component({
    selector: 'jigsaw-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Jigsaw Seed';

    gotoTourist() {
        window.open('https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md', '_blank');
    }

    gotoGithub() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }

    changeTheme(style: MajorStyle) {
        JigsawTheme.changeTheme('paletx-pro', style);
    }
}
