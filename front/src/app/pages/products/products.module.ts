import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FiltersModule } from 'src/app/components/filters/filters.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    FormsModule,
    CommonModule,
    FiltersModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
