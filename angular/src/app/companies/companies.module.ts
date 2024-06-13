import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
