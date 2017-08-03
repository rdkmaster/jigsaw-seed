// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Hero, HeroService }  from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes | async"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{ hero.id }}</span> {{ hero.name }}
      </li>
    </ul>

    <button routerLink="/sidekicks">Go to sidekicks</button>
  `
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;

  private selectedId: string;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroes = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = params.get('id');
        return this.service.getHeroes();
      });
  }

  isSelected(hero: Hero) { return hero.id === this.selectedId; }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
