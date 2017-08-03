import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable }            from 'rxjs/Observable';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises | async"
        (click)="onSelect(crisis)"
        [class.selected]="isSelected(crisis)">
          <span class="badge">{{ crisis.id }}</span>
          {{ crisis.name }}
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class CrisisListComponent implements OnInit {
  crises: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isSelected(crisis: Crisis) {
    return crisis.id === this.selectedId;
  }

  ngOnInit() {
    this.crises = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.service.getCrises();
      });
  }

  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;

    // Navigate with relative link
    this.router.navigate([crisis.id], { relativeTo: this.route });
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/