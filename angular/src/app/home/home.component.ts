import { AuthService } from '@abp/ng.core';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { GbFactsComponent } from '../application/components/gb-facts/gb-facts.component';
import { AccountsClassificationComponent } from '../application/components/accounts-classification/accounts-classification.component';
import { EconomicAndStatisticalDataComponent } from '../application/components/economic-and-statistical-data/economic-and-statistical-data.component';
import { GbUniversalFactsViewComponent } from '../application/components/gb-universal-facts-view/gb-universal-facts-view.component';
import { GbUniversalFactsComponent } from '../application/components/gb-universal-facts/gb-universal-facts.component';
import { GbirComponent } from '../application/components/gbir/gbir.component';
import { LhscUploadComponent } from '../application/components/lhsc-upload/lhsc-upload.component';
import { OwnershipComponent } from '../application/components/ownership/ownership.component';
import { ProductsServicesAndRawMaterialsComponent } from '../application/components/products-services-and-raw-materials/products-services-and-raw-materials.component';
import { ReportsComponent } from '../application/components/reports/reports.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tabs: any[] = [];
  selectedIndex = 0;

  @ViewChild('tabContainer', {read: ViewContainerRef}) tabContainer: ViewContainerRef;
  
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService,private tabService: TabService
  ) {}

  login() {
    this.authService.navigateToLogin();
  }

  ngOnInit(){
    this.tabService.tabs$.subscribe(tabs => {
      this.tabs = tabs;
    }); 
  }

  addinTab(type:string,index : number){
    if(type == "GbFacts"){
      this.addTab("Gb Facts", GbFactsComponent);
    }else if(type == "AccountClassification"){
      this.addTab("Accounts Classificartion", AccountsClassificationComponent);
    }else if(type == "ownership"){
      this.addTab("Ownership", OwnershipComponent);
    }else if(type == "reports"){
      this.addTab("Reports", ReportsComponent);
    }else if(type == "lhsc-upload"){
      this.addTab("LHSC Upload", LhscUploadComponent);
    }else if(type == "gbir"){
      this.addTab("GBIR", GbirComponent);
    }else if(type == "gbir-universal-facts"){
      this.addTab("GBIR Universal Facts", GbUniversalFactsComponent);
    }else if(type == "gbir-universal-facts-view"){
      this.addTab("GBIR Universal Facts View", GbUniversalFactsViewComponent);
    }else if(type == "products-services-and-raw-materials"){
      this.addTab("Products Services And Raw Materials", ProductsServicesAndRawMaterialsComponent);
    }else if(type == "economic-and-statistical-data"){
      this.addTab("Economic and Statistical Data", EconomicAndStatisticalDataComponent);
    }
    this.loadTabComponent();
    this.selectTab(index);
  }

  addTab(title: string, component: any) {
    
    this.tabService.addTab({ title, component });
  }

  selectTab(index: number) {
    
    this.selectedIndex = index;
    // this.loadTabComponent();
  }

  closeTab(index: number, event: Event) {
    event.stopPropagation();
    this.tabService.removeTab(index);
    if (this.selectedIndex === index && this.tabs.length > 0) {
      this.selectedIndex = Math.max(0, index - 1);
    }
    this.loadTabComponent();
  }

  loadTabComponent() {
    
    if(this.tabs.length > 0){
      
      const component = this.tabs[this.selectedIndex].component;
      this.tabContainer.createComponent(component);
      
    }
  }
  
}
