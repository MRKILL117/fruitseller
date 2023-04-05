import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuyersComponent } from './buyers.component';

const routes: Routes = [
  {
    path: '',
    component: BuyersComponent
  }
];

@NgModule({
  declarations: [BuyersComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BuyersModule { }
