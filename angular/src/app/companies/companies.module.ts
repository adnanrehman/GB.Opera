import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { TableModule } from 'primeng/table';
import { CompanySectorComponent } from '../common/components/company-sector/company-sector.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    NgModule,
    CompanySectorComponent,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
