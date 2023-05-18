import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { DatePickerComponent } from './date-picker.component';

const routes: Routes = [
  {
    path: '',
    component: DatePickerComponent
  }
];

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    // RouterModule.forChild(routes)
  ],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
