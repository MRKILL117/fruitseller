import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SellOrdersComponent } from './sell-orders.component';
import { FiltersModule } from 'src/app/components/filters/filters.module';

const routes: Routes = [
  {
    path: '',
    component: SellOrdersComponent
  }
];

@NgModule({
  declarations: [SellOrdersComponent],
  imports: [
    FormsModule,
    CommonModule,
    FiltersModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SellOrdersModule { }
