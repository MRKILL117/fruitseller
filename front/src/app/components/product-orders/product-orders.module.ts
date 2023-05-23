import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProductOrdersComponent } from './product-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOrdersComponent
  }
];

@NgModule({
  declarations: [ProductOrdersComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [ProductOrdersComponent]
})
export class ProductOrdersModule { }
