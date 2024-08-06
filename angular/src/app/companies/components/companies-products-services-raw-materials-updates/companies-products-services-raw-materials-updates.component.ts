import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CompanyPSRawDto, CompanyPSRawService } from '@proxy/company-psraws';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies-products-services-raw-materials-updates',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule,TreeModule
  ],
  templateUrl: './companies-products-services-raw-materials-updates.component.html',
  styleUrl: './companies-products-services-raw-materials-updates.component.scss'
})
export class CompaniesProductsServicesRawMaterialsUpdatesComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  productServiceRawID: number;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companyPSRaws = [];
  tree:TreeNode[];
  data:TreeNode[];
  psrMappings: any[];
  selectedNode: TreeNode;
  selectedNodes: any[] = [];
  companyPSRawActivation!: number;
  companyPSRaw: CompanyPSRawDto = {
    compServiceID: 0,
    companyID: 0,
    productServiceRawID: 0,
    parentID: 0,
    isActive: false
  }
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];

  constructor(
    private commonService: CommonService,
    private companyPSRawService:CompanyPSRawService
  ) {}

  ngOnInit() {
    this.getMarketLangAnnouncements();
    this.stockMarketID = 0;
    this.fetchTreeData();
  }

  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.commonService.getAllPSRMappings().subscribe(res => {
      console.log('Tree res:', res);
      
      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.psrMappings = res.map(item => {
        let newItem = {
          ...item,
          label: item.name || '', // Assign gbFact to label or default to empty string
          aName: item.aName,
          parent: null,
          children: []
        };
        idMap[newItem.productServiceRawID] = newItem;
        return newItem;
      });
  
      // Build the tree structure
      let treeData = [];
      this.psrMappings.forEach(item => {
        if (item.parentID === 0) {
          treeData.push(item);
        } else {
          let parentItem = idMap[item.parentID];
          if (parentItem) {
            parentItem.children.push(item);
            item = parentItem;
          } else {
            console.error(`Parent id ${item.parentID} not found in idMap.`);
          }
        }
      });
  
      // Assign the final tree data to gbFactListDto
      this.psrMappings = treeData;
      console.log('Tree Data:', this.psrMappings);
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading =true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading =false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading =true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getCompMarketSectorsByMarketID();
    this.loading =false;
  }

  getMarketLangAnnouncements() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.marketLangAnnouncement = res;
    });
  }

  getCompMarketSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMarketSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getCompaniesTickersBySectorIDAndMarketID();
      else this.loading = false;
    });
  }

  getCompaniesTickersBySectorIDAndMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getCompaniesTickersBySectorIDAndMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0) this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
        else this.loading = false;
      });
  }

  getCompanyPSRawsByProductServiceRawIDAndCompanyID(): void {
    debugger; // For debugging purposes
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    if (this.productServiceRawID == undefined && this.psrMappings.length > 0)
      this.productServiceRawID = this.psrMappings[0].productServiceRawID;
    this.companyPSRawService.getCompanyPSRawsByProductServiceRawIDAndCompanyID(this.productServiceRawID,this.companyID).subscribe(res => {
      this.companyPSRaws = res.companyPSRaws;
      if (this.companyPSRaws.length > 0) this.handlecompanyPSRaw(this.companyPSRaws[0]);
      else this.loading = false;
    });
  }

  // NodeSelection(list: any[]) {    
  //   for (let x of list) {
  //     var gbFact = list.find(f => f.gbOwnershipID == x.gbOwnershipID);
  //       if(gbFact){
  //         this.selectedNode = gbFact;
  //       }
  //     if (x.children.length !== 0) {
  //       var result = this.NodeSelection(x.children);
  //       if(result){ 
  //         return true;
  //       }
  //     } 
  
  //   }
  
  //   return false;
  
  // }


  handlecompanyPSRaw(CompanyPSRaw: CompanyPSRawDto) {
    debugger;
    this.companyPSRaw = CompanyPSRaw
    this.companyPSRawActivation = this.companyPSRaw.isActive ? 1 : 0;
    this.loading = false;
  }

  onNodeClick(event: any) {
    debugger;
    this.productServiceRawID = event.node.productServiceRawID;
    this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
    // this.handlecompanyPSRaw(event.node);
  }

  NodeSelection(list: any[],productServiceRawID: number) {    
    for (let x of list) {
        if(x.productServiceRawID == productServiceRawID){
          let newItem: TreeNode = {
            ...x,
            label: x.name || '', // Assign gbFact to label or default to empty string
            parent: null,
            expanded: true,
            selectable: true,
            data:x.name,
            partialSelected: true,
            children: []
          };
          this.selectedNode = newItem;
          this.loading =false;
          return true;
        }
      if (x.children.length !== 0) {
        var result = this.NodeSelection(x.children,productServiceRawID);
        if(result){ 
          return true;
        }
      } 
  
    }
  
    return false;
  
  }

  onNodeSelect(event: { originalEvent: Event, node: TreeNode }): void {
   debugger;
    this.selectedNode = event.node;
    this.selectedNodes.push(event.node)
     
  }

  // save() {
  //   debugger;
  //   this.loading =true;
  //   this.companyPSRaw.isActive = this.companyPSRawActivation == 1 ? true : false;
  //   this.companyPSRawService.getCompanyPSRawsByProductServiceRawIDAndCompanyID(this.companyOwnershipFact).subscribe({
  //     next: (res) => {
  //       Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
  //       console.log('Save response:', res);    
  //       this.loading =false;  
  //     },
  //     error: (err) => {
  //       console.error("Error While Saveing", err);
  //       this.loading =false;  
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 1000,
  //         title: 'Error!',
  //         text: "Error While Saveing",
  //         icon: 'error'
  //       });
       
  //      // alert("Save error: " + err.message); // Display error message to user
  //     }
  //   });
  // }
}
