import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

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
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class CreateSellOrderModule { }
