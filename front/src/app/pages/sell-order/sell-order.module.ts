import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';

import { SellOrderComponent } from './sell-order.component';

const routes: Routes = [
  {
    path: '',
    component: SellOrderComponent
  }
];

@NgModule({
  declarations: [SellOrderComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    DatePickerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SellOrderModule { }
