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
import { CompanyOwnershipFactEditDto, CompanyOwnershipFactService } from '@proxy/company-ownership-facts';
import { FactsOwnershipMappingDto, CommonService } from '@proxy/commons';
import { CompanyGBFactMappingDto } from '@proxy/company-accounts';
import { GbFactListDto } from '@proxy/gb-facts';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Company_UpdateOwnershipFacts } from 'src/app/services/permissions';
@Component({
  selector: 'app-update-ownership-facts',
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
    TabViewModule, TreeModule
  ],
  templateUrl: './update-ownership-facts.component.html',
  styleUrl: './update-ownership-facts.component.scss'
})
export class UpdateOwnershipFactsComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  clickedIndex = 0;
  stockMarketID: number;
  companyID: number = 0;
  lastcompanyID: number = this.companyID;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companyOwnerships = [];
  tree: TreeNode[];
  data: TreeNode[];
  factsOwnershipMappings: any[];
  selectedNode: TreeNode;
  selectedNodes: any[] = [];
  companyOwnershipFact: CompanyOwnershipFactEditDto = {
    gbOwnershipID: 0,
    companyID: 0,
    parentID: 0,
    value: 0
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }

  constructor(
    private commonService: CommonService,
    private companyOwnershipFactService: CompanyOwnershipFactService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_UpdateOwnershipFacts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_UpdateOwnershipFacts + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_UpdateOwnershipFacts + '.delete')) {
      this.permission.delete = true;
    }
    this.getMarketLangAnnouncements();
    // this.stockMarketID = 0;
    this.fetchTreeData();
  }

  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.commonService.getAllFactsOwnershipMappings().subscribe(res => {
      console.log('Tree res:', res);

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.factsOwnershipMappings = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbOwnership || '', // Assign gbFact to label or default to empty string
          parent: null,
          children: []
        };
        idMap[newItem.gbOwnershipID] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.factsOwnershipMappings.forEach(item => {
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
      this.factsOwnershipMappings = treeData;
      console.log('Tree Data:', this.factsOwnershipMappings);
      if (this.marketLangAnnouncement.length > 0) this.stockMarketID = this.marketLangAnnouncement[0].stockMarketID; this.getCompMarketSectorsByMarketID();
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    //this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
   //   this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID;
    this.lastcompanyID = this.companyID;
    //this.getCompMarketSectorsByMarketID();
    this.getCompaniesTickersBySectorIDAndMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getMarketLangAnnouncements() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.marketLangAnnouncement = res;
      
    });
  }

  onListBoxSelectionChange(event: any) {
    if(this.companyID == null)
      this.companyID = this.lastcompanyID;
    else
    this.lastcompanyID = this.companyID;
  }

  getCompMarketSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMarketSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) {
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getCompaniesTickersBySectorIDAndMarketID();
      }
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
        if (this.companiesTickers.length > 0) {
          this.companyID = this.companiesTickers[0].companyID;
          this.getCompaniesFactsByCompanyID();
        }
        else this.loading = false;
      });
  }

  getCompaniesFactsByCompanyID(): void {
    
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companyOwnershipFactService.getCompanyOwnershipPreviewByCompanyID(this.companyID).subscribe(res => {
      this.companyOwnerships = res;
      if (this.companyOwnerships.length > 0) 
        this.handleCompanyOwnershipFact(this.companyOwnerships[0]);
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


  handleCompanyOwnershipFact(obj: any) {
    debugger;
    this.companyOwnershipFact.gbOwnershipID = obj.gbOwnershipID;
    this.companyOwnershipFact.facts = obj.facts;
    if (obj.gbOwnership)
      this.companyOwnershipFact.facts = obj.gbOwnership;
    this.companyOwnershipFact.parentID = obj.parentID;
    this.companyOwnershipFact.companyID = this.companyID;
    this.companyOwnershipFact.value = obj.figures;
    this.NodeSelection(this.factsOwnershipMappings, this.companyOwnershipFact.gbOwnershipID);
    this.loading = false;
  }

  onNodeClick(event: any) {
    debugger;
    this.handleCompanyOwnershipFact(event.node);
  }

  NodeSelection(list: any[], gbOwnershipID: number) {
    for (let x of list) {
      if (x.gbOwnershipID == gbOwnershipID) {
        let newItem: TreeNode = {
          ...x,
          label: x.gbOwnership || '', // Assign gbFact to label or default to empty string
          parent: null,
          expanded: true,
          selectable: true,
          data: x.gbOwnership,
          partialSelected: true,
          children: []
        };
        this.selectedNode = newItem;
        this.loading = false;
        return true;
      }
      if (x.children.length !== 0) {
        var result = this.NodeSelection(x.children, gbOwnershipID);
        if (result) {
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

  save() {
    debugger;
    this.loading = true;
    this.companyOwnershipFactService.createOrUpdateCompanyOwnershipsByDto(this.companyOwnershipFact).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
this.getCompaniesFactsByCompanyID();
        this.companyOwnershipFact = {
          gbOwnershipID: 0,
          companyID: 0,
          parentID: 0,
          value: 0
        };
        
      },
      error: (err) => {
        console.error("Error While Saveing", err);
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          title: 'Error!',
          text: "Error While Saveing",
          icon: 'error'
        });

        // alert("Save error: " + err.message); // Display error message to user
      }
    });
  }
}
