import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';

import { CreateSellOrderComponent } from './create-sell-order.component';

const routes: Routes = [
  {
    path: '',
    component: CreateSellOrderComponent
  }
];

@NgModule({
  declarations: [CreateSellOrderComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    DatePickerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateSellOrderModule { }
