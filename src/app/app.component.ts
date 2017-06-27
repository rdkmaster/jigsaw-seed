import {Component, Renderer2, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jigsaw';

  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
  }
}
