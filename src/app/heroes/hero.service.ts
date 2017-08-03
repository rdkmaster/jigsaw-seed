import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

export class Hero {
  constructor(public id: string, public name: string) { }
}

let HEROES = [
  new Hero('JigsawAlert', 'Mr. Nice'),
  new Hero('JigsawRangeTime', 'Narco')
];

let heroesPromise = Promise.resolve(HEROES);

@Injectable()
export class HeroService {
  constructor(private _http:Http) {
  }

  getHeroes() { return heroesPromise; }

  getHero(compName: string) {
    const url: string = `mock-data/components/${compName}.html`;
    console.log(url);
    return this._http.get(url);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
