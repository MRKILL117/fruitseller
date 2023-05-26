import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FiltersModule } from 'src/app/components/filters/filters.module';

import { DailyShoppingListComponent } from './daily-shopping-list.component';
import { ProductOrdersModule } from 'src/app/components/product-orders/product-orders.module';

const routes: Routes = [
  {
    path: '',
    component: DailyShoppingListComponent
  }
];

@NgModule({
  declarations: [DailyShoppingListComponent],
  imports: [
    FormsModule,
    CommonModule,
    FiltersModule,
    NgSelectModule,
    ProductOrdersModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DailyShoppingListModule { }
