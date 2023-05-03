import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FiltersComponent } from './filters.component';
import { DatePickerModule } from '../date-picker/date-picker.module';

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
    DatePickerModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [FiltersComponent]
})
export class FiltersModule { }
