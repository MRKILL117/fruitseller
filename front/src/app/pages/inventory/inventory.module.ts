import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { InventoryComponent } from './inventory.component';
import { FiltersModule } from 'src/app/components/filters/filters.module';
import { ProductInventoryHistoryModule } from 'src/app/components/product-inventory-history/product-inventory-history.module';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent
  }
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    FormsModule,
    CommonModule,
    FiltersModule,
    NgSelectModule,
    ReactiveFormsModule,
    ProductInventoryHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
