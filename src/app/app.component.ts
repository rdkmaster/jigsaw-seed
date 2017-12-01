import {Component, Renderer2, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Jigsaw Seed';

    constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
    }

    gotoTourist() {
        window.open('https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md', '_blank');
    }

    gotoGithub() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }
}
