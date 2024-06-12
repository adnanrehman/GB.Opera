import { AuthService } from '@abp/ng.core';
import { Component, ComponentFactoryResolver, ElementRef, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '@proxy/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tabs: any[] = [];
  menus: any[] = [];
  selectedIndex = 0;
  activeTab!:string;
  navbarCollapsed = true;
  public gfg = true; 

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  @ViewChild('container', {read: ViewContainerRef, static: false}) tabContainer!: ViewContainerRef;
  // @ViewChild('container', {static: true}) container: ViewContainerRef;
  @ViewChildren('tabContainer', {read: ViewContainerRef}) public widgetTargets: QueryList<ViewContainerRef>;
  // @ViewChild('container', { read: ViewContainerRef, static: true }) tabContainer!: ViewContainerRef;
  @ViewChild('navtabContent') navtab: ElementRef;

  
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService,
    private tabService: TabService,
    private menuService: MenuService,
    private spinner: NgxSpinnerService,
  ) {

  }

  login() {
    this.authService.navigateToLogin();
  }

  ngAfterViewInit(){
    // this.tabService.addTab({ title:"Gb Facts",component:GbFactsComponent,href:"GbFacts" });
    // this.selectTab("GbFacts");
    // this.loadTabComponent();
  }
  

  ngOnInit(){
    this.spinner.show();
    this.tabService.tabs$.subscribe(tabs => {
      this.tabs = tabs;
      this.spinner.hide();
    }); 
    this.menuService.menus$.subscribe(menus => {
      this.menus = menus;
      this.spinner.hide();
    }); 
  }

  addinTab(type:string){
    debugger;
    this.menus.forEach(element => {
      var currentTab = element.menuItems.find(x => x.href == type);
    if(currentTab != null){
      this.addTab(currentTab.title, currentTab.component,currentTab.href);
    }
    });
    

    // if(type == "gb-facts"){
    //   this.addTab("Gb Facts", GbFactsComponent,type);
    // }else if(type == "account-classification"){
    //   this.addTab("Accounts Classificartion", AccountsClassificationComponent,type);
    // }else if(type == "ownership"){
    //   this.addTab("Ownership", OwnershipComponent,type);
    // }else if(type == "reports"){
    //   this.addTab("Reports", ReportsComponent,type);
    // }else if(type == "lhsc-upload"){
    //   this.addTab("LHSC Upload", LhscUploadComponent,type);
    // }else if(type == "gbir"){
    //   this.addTab("GBIR", GbirComponent,type);
    // }else if(type == "gbir-universal-facts"){
    //   this.addTab("GBIR Universal Facts", GbUniversalFactsComponent,type);
    // }else if(type == "gbir-universal-facts-view"){
    //   this.addTab("GBIR Universal Facts View", GbUniversalFactsViewComponent,type);
    // }else if(type == "products-services-and-raw-materials"){
    //   this.addTab("Products Services And Raw Materials", ProductsServicesAndRawMaterialsComponent,type);
    // }else if(type == "economic-and-statistical-data"){
    //   this.addTab("Economic and Statistical Data", EconomicAndStatisticalDataComponent,type);
    // }
    
  }

  addTab(title: string, component: any,href:string) {
    this.spinner.show();
    if(this.tabs.length > 0){
      debugger;
      var exist = this.tabs.find(a=>a.title.toString() == title.toString());
      if(exist == undefined){
        this.tabService.addTab({ title:title,component:component,href:href });
        this.selectTab(href);
        setTimeout(()=>{           
          this.loadTabComponent();
          this.spinner.hide();
     }, 100);        
      } else{
        this.selectTab(href);
      } 

    }else{
      this.tabService.addTab({ title:title,component:component,href:href  });
      this.selectTab(href);      
      setTimeout(()=>{         
        this.loadTabComponent();
        this.spinner.hide();
   }, 500);
      
    }
  }

  selectTab(href: string) {
    this.activeTab = href;
  //   let elements = document.getElementsByClassName("d-none");
  //   for (var i = 0; i < elements.length; i++) {
  //     elements[i].nextElementSibling.setAttribute("class", "d-none");
  // }​
  }

  closeTab(index: number, event: Event) {
    debugger;
    event.stopPropagation();
    this.tabService.removeTab(index);
    // if (this.selectedIndex === index && this.tabs.length > 0) {
    //   this.selectedIndex = Math.max(0, index - 1);
    // }
    this.selectTab(this.tabs[index-1].href);
    // this.loadTabComponent();
  }

  async loadTabComponent() {    
    debugger;
    if(this.tabs.length > 0){    
      if(this.widgetTargets.length == 0)  {
        this.tabContainer.createComponent(GbFactsComponent);
      }else{
        // this.navtab.nativeElement.nextSibling.classList.toggle('d-none');
        this.widgetTargets.map((vcr: ViewContainerRef,index:number) =>{
          // index = index+1;
          vcr.clear();
          const component = this.tabs[index].component;
          const componentRef = vcr.createComponent(component);
          // let element: HTMLElement = <HTMLElement>componentRef.location.nativeElement;
          // if(this.widgetTargets.length != index)
          //   element.style.display = "none";
        }); 
      }
  
    }
  }
  
}
