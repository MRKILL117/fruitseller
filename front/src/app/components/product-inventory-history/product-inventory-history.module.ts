import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProductInventoryHistoryComponent } from './product-inventory-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProductInventoryHistoryComponent
  }
];

@NgModule({
  declarations: [ProductInventoryHistoryComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [ProductInventoryHistoryComponent]
})
export class ProductInventoryHistoryModule { }
