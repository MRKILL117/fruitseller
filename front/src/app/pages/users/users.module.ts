import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FiltersModule } from 'src/app/components/filters/filters.module';

import { UsersComponent } from './users.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    FormsModule,
    CommonModule,
    HeaderModule,
    FiltersModule,
    NgSelectModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
