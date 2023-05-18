import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductPriceHistoryModule } from 'src/app/components/product-price-history/product-price-history.module';

import { PriceListComponent } from './price-list.component';
import { FiltersModule } from 'src/app/components/filters/filters.module';

const routes: Routes = [
  {
    path: '',
    component: PriceListComponent
  }
];

@NgModule({
  declarations: [PriceListComponent],
  imports: [
    FormsModule,
    CommonModule,
    FiltersModule,
    NgSelectModule,
    ReactiveFormsModule,
    ProductPriceHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class PriceListModule { }
