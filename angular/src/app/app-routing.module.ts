import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GbFactsComponent } from './application/components/gb-facts/gb-facts.component';
import { AccountsClassificationComponent } from './application/components/accounts-classification/accounts-classification.component';
import { OwnershipComponent } from './application/components/ownership/ownership.component';
import { ReportsComponent } from './application/components/reports/reports.component';
import { LhscUploadComponent } from './application/components/lhsc-upload/lhsc-upload.component';
import { GbirComponent } from './application/components/gbir/gbir.component';
import { GbUniversalFactsComponent } from './application/components/gb-universal-facts/gb-universal-facts.component';
import { ProductsServicesAndRawMaterialsComponent } from './application/components/products-services-and-raw-materials/products-services-and-raw-materials.component';
import { EconomicAndStatisticalDataComponent } from './application/components/economic-and-statistical-data/economic-and-statistical-data.component';
import { ApplicationComponent } from './application/components/application/application.component';
import { GbUniversalFactsViewComponent } from './application/components/gb-universal-facts-view/gb-universal-facts-view.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  // },
  // {
  //   path: 'tenant-management',
  //   loadChildren: () =>
  //     import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  // },
  // {
  //   path: 'setting-management',
  //   loadChildren: () =>
  //     import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  // },
  // {
  //   path: 'application',
  //   loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
  //   data: {
  //     routes: {
  //       name: 'Application',
  //       order: 1,
  //       iconClass: 'fas fa-question-circle',
  //       children: [
  //         {
  //           path: 'app',
  //           name: 'app',
  //           order: 1,
  //           component: ApplicationComponent,
  //         },
  //         {
  //           path: 'gb-facts',
  //           name: 'GB Facts',
  //           order: 2,
  //           component: GbFactsComponent,
  //         },
  //         {
  //           path: 'accounts-classification',
  //           name: 'Accounts Classification',
  //           order: 3,
  //           component: AccountsClassificationComponent,
  //         },
  //         {
  //           path: 'ownership',
  //           name: 'Ownership',
  //           order: 4,
  //           component: OwnershipComponent,
  //         },
  //         {
  //           path: 'reports',
  //           name: 'Reports',
  //           order: 5,
  //           component: ReportsComponent,
  //         },
  //         {
  //           path: 'lhsc-upload',
  //           name: 'LHSC Upload',
  //           order: 6,
  //           component: LhscUploadComponent,
  //         },
  //         {
  //           path: 'gbir',
  //           name: 'GBIR',
  //           order: 7,
  //           component: GbirComponent,
  //         },
  //         {
  //           path: 'gbir-universal-facts',
  //           name: 'GBIR Universal Facts',
  //           order: 8,
  //           component: GbUniversalFactsComponent,
  //         },
  //         {
  //           path: 'gbir-universal-facts-view',
  //           name: 'GBIR Universal Facts View',
  //           order: 9,
  //           component: GbUniversalFactsViewComponent,
  //         },
  //         {
  //           path: 'products-services-and-raw-materials',
  //           name: 'Products Services And Raw Materials',
  //           order: 10,
  //           component: ProductsServicesAndRawMaterialsComponent,
  //         },
  //         {
  //           path: 'economic-and-statistical-data',
  //           name: 'Economic and Statistical Data',
  //           order: 11,
  //           component: EconomicAndStatisticalDataComponent,
  //         },
  //       ],
  //     },
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
