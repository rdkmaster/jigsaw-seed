import 'rxjs/add/operator/switchMap';
import {Component, OnInit, HostBinding, Directive, Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { slideInDownAnimation } from '../animations';

import { Hero, HeroService }  from './hero.service';
import {Http} from "@angular/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Directive({
  selector: '[hello-jigsaw]'
})
export class TestComponent {
  constructor() {
    console.log('jigsaw is great!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
}

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}

@Component({
  template: `
    <div hello-jigsaw></div>
  <div *ngIf="hero">
    <h3>Component URL: {{ hero.id }}</h3>
    <div [innerHtml]="hero.name | sanitizeHtml">
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `,
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.http.get(`mock-data/components/${params.get('id')}.html`))
      .subscribe(html => this.hero = new Hero(html.url, html.text()));
  }

  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes']);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
