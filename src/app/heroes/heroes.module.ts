import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HeroListComponent} from './hero-list.component';
import {HeroDetailComponent, SanitizeHtmlPipe, TestComponent} from './hero-detail.component';

import {HeroService} from './hero.service';

import {HeroRoutingModule} from './heroes-routing.module';
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule,
    HttpModule
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    TestComponent, SanitizeHtmlPipe
  ],
  providers: [ HeroService, SanitizeHtmlPipe ]
})
export class HeroesModule {
  constructor() {
    window['hello'] = () => {
      alert('aaaaaaaaaaaaaaaaaaaafdfdfd')
    }
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
