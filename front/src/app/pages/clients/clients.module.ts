import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FiltersModule } from 'src/app/components/filters/filters.module';

import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  }
];

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    FormsModule,
    CommonModule,
    HeaderModule,
    FiltersModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
