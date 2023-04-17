import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FiltersComponent } from './filters.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent
  }
];

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [FiltersComponent]
})
export class FiltersModule { }
