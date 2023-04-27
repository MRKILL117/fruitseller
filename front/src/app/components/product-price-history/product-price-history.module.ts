import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProductPriceHistoryComponent } from './product-price-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPriceHistoryComponent
  }
];

@NgModule({
  declarations: [ProductPriceHistoryComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [ProductPriceHistoryComponent]
})
export class ProductPriceHistoryModule { }
