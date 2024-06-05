import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GbFactsComponent } from './components/gb-facts/gb-facts.component';
import { AccountsClassificationComponent } from './components/accounts-classification/accounts-classification.component';
import { EconomicAndStatisticalDataComponent } from './components/economic-and-statistical-data/economic-and-statistical-data.component';
import { GbUniversalFactsComponent } from './components/gb-universal-facts/gb-universal-facts.component';
import { GbirComponent } from './components/gbir/gbir.component';
import { LhscUploadComponent } from './components/lhsc-upload/lhsc-upload.component';
import { OwnershipComponent } from './components/ownership/ownership.component';
import { ProductsServicesAndRawMaterialsComponent } from './components/products-services-and-raw-materials/products-services-and-raw-materials.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApplicationComponent } from './components/application/application.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'app',
        component: ApplicationComponent,
        pathMatch: "full"
      },
      {
        path: 'gb-facts',
        component: GbFactsComponent,
        pathMatch: "full"
      },
      {
        path: 'accounts-classification',
        pathMatch: "full",
        component: AccountsClassificationComponent,
      },
      {
        path: 'ownership',
        pathMatch: "full",
        component: OwnershipComponent,
      },
      {
        path: 'reports',
        pathMatch: "full",
        component: ReportsComponent,
      },
      {
        path: 'lhsc-upload',
        pathMatch: "full",
        component: LhscUploadComponent,
      },
      {
        path: 'gbir',
        pathMatch: "full",
        component: GbirComponent,
      },
      {
        path: 'gbir-universal-facts',
        pathMatch: "full",
        component: GbUniversalFactsComponent,
      },
      {
        path: 'gbir-universal-facts-view',
        pathMatch: "full",
        component: GbUniversalFactsComponent,
      },
      {
        path: 'products-services-and-raw-materials',
        pathMatch: "full",
        component: ProductsServicesAndRawMaterialsComponent,
      },
      {
        path: 'economic-and-statistical-data',
        pathMatch: "full",
        component: EconomicAndStatisticalDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
