import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService, Rest } from '@abp/ng.core';
import { GbFactsComponent } from 'src/app/application/components/gb-facts/gb-facts.component';
import { AccountsClassificationComponent } from 'src/app/application/components/accounts-classification/accounts-classification.component';
import { EconomicAndStatisticalDataComponent } from 'src/app/application/components/economic-and-statistical-data/economic-and-statistical-data.component';
import { GbUniversalFactsViewComponent } from 'src/app/application/components/gb-universal-facts-view/gb-universal-facts-view.component';
import { GbUniversalFactsComponent } from 'src/app/application/components/gb-universal-facts/gb-universal-facts.component';
import { GbirComponent } from 'src/app/application/components/gbir/gbir.component';
import { LhscUploadComponent } from 'src/app/application/components/lhsc-upload/lhsc-upload.component';
import { OwnershipComponent } from 'src/app/application/components/ownership/ownership.component';
import { ProductsServicesAndRawMaterialsComponent } from 'src/app/application/components/products-services-and-raw-materials/products-services-and-raw-materials.component';
import { ReportsComponent } from 'src/app/application/components/reports/reports.component';

class Menu {
  title: string;
  menuItems:MenuItem[];
}

class MenuItem{
  href: string;
  title: string;
  component: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  private menusSubject = new BehaviorSubject<Menu[]>([]);
  menus$ = this.menusSubject.asObservable();
  menu : Menu[];
  

constructor(){
  this.menu = [
    {title:"Application", menuItems:
      [
      { href:"gb-facts", title:"Gb Facts", component:GbFactsComponent },
      { href:"account-classification", title:"Accounts Classificartion", component:AccountsClassificationComponent },
      { href:"ownership", title:"Ownership", component:OwnershipComponent },
      { href:"reports", title:"Reports", component:ReportsComponent },
      { href:"lhsc-upload", title:"LHSC Upload", component:LhscUploadComponent },
      { href:"gbir", title:"GBIR", component:GbirComponent },
      { href:"gbir-universal-facts", title:"GBIR Universal Facts", component:GbUniversalFactsComponent },
      { href:"gbir-universal-facts-view", title:"GBIR Universal Facts View", component:GbUniversalFactsViewComponent },
      { href:"products-services-and-raw-materials", title:"Products Services And Raw Materials", component:ProductsServicesAndRawMaterialsComponent },
      { href:"economic-and-statistical-data", title:"Economic and Statistical Data", component:EconomicAndStatisticalDataComponent },
      ]
    },
    {title:"Companies and Markets", menuItems:
      [
      { href:"gb-facts", title:"Gb Facts", component:GbFactsComponent },
      ]
    }
  ]
  this.menusSubject.next(this.menu);
}

}