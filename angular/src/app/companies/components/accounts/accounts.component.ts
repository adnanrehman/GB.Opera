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
import { CommonService } from '@proxy/commons';
import { GbFactListDto, GbFactService } from '@proxy/gb-facts';
import { CompanyAccountService, CompanyGBFactMappingDto } from '@proxy/company-accounts';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Company_Accounts } from 'src/app/services/permissions';
import { RenameAccountComponent } from './rename-account/rename-account.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-accounts',
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
    TooltipModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  ref!: DynamicDialogRef;
  companyTicker: string;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  tree: TreeNode[];
  data: TreeNode[];
  gbFactLists: GbFactListDto[];
  companyFacts: CompanyGBFactMappingDto[];
  selectedNode: TreeNode;
  selectedNodes: any[] = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private dialogService: DialogService,
    private companyAccountService: CompanyAccountService,
    private gbfactservice: GbFactService, private permissionService: PermissionService

  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_Accounts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Accounts + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Accounts + '.delete')) {
      this.permission.delete = true;
    }
    this.getMarketLangAnnouncements();
    // this.stockMarketID = 0;
    this.fetchTreeData();
    this.tree = [
      {
        label: 'Accounts Breakdown',
        children: [
          {
            label: 'Revenues',
            children: [
              {
                label: 'Total Operating Income',
              },
              {
                label: 'Sales',
              },
              {
                label: 'Revenues',
              },
              {
                label: 'Gross Premiums',
              },

            ]
          }
        ],
      }
    ]
  }

  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.gbfactservice.getAllFactsMappings().subscribe(res => {
      console.log('Tree res:', res);

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.gbFactLists = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          children: []
        };
        idMap[newItem.gbFactID] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.gbFactLists.forEach(item => {
        if (item.parentId === 0) {
          treeData.push(item);
        } else {
          let parentItem = idMap[item.parentId];
          if (parentItem) {
            parentItem.children.push(item);
            item = parentItem;
          } else {
            console.error(`Parent id ${item.parentId} not found in idMap.`);
          }
        }
      });

      // Assign the final tree data to gbFactListDto
      this.gbFactLists = treeData;
      if (this.marketLangAnnouncement.length > 0) this.stockMarketID = this.marketLangAnnouncement[0].stockMarketID; this.getCompMarketSectorsByMarketID();
      console.log('Tree Data:', this.gbFactLists);
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.companyTicker = event.value.ticker
    this.getCompMarketSectorsByMarketID();
    this.loading = false;
  }

  getMarketLangAnnouncements() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.marketLangAnnouncement = res;
      if (this.marketLangAnnouncement.length > 0) this.stockMarketID = this.marketLangAnnouncement[0].stockMarketID; this.getCompMarketSectorsByMarketID();
    });
  }

  getCompMarketSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMarketSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) {
        if(!this.sectorID)
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
          // if(!this.companyID)
          // this.companyID = this.companiesTickers[0].companyID;
          // this.companyTicker = this.companiesTickers[0].ticker;
          // this.getCompaniesFactsByCompanyID();
        }
        else this.loading = false;
      });
  }

  getCompaniesFactsByCompanyID(): void {
    debugger; // For debugging purposes
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companyTicker = this.companiesTickers.find(f => f.companyID == this.companyID).ticker;
    this.companyAccountService.getCompaniesFactsByCompanyID(this.companyID).subscribe(res => {
      console.log('Tree res:', res);
      this.selectedNodes = [];
      this.NodeSelection(this.gbFactLists, res);
      this.loading = false;
    });
  }

  NodeSelection(list: any[], companyFacts: any[]) {
    for (let x of list) {
      debugger;
      var gbFact = companyFacts.find(f => f.gbFactID == x.gbFactID && f.companyID == this.companyID);
      if (gbFact) {
        x.gbFact = gbFact.customFactName;
        x.aGbFact = gbFact.aCustomFactName;        
        this.selectedNodes.push(x);
      }else{
        x.gbFact = null;
        x.aGbFact = null;
      }
      if (x.children.length !== 0) {
        var result = this.NodeSelection(x.children, companyFacts);
        if (result) {
          return true;
        }
      }

    }

    return false;

  }

  onNodeSelect(event: { originalEvent: any, node: TreeNode }): void {
    debugger;
    this.selectedNode = event.node;
    if(this.selectedNode){
      if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
        console.log('Ctrl or Command + Click');
        this.renameFact(event);
      }
    }
    this.selectedNodes.push(event.node)

  }

  onNodeClick(event: { originalEvent: any },node:any) {
    debugger;
    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      console.log('Ctrl or Command + Click');
      this.renameFact(event);
    }
    
   
  }

  renameFact(obj: any) {
    debugger;
    this.ref = this.dialogService.open(RenameAccountComponent, {
      header: 'Rename Account',
      data: {
        obj: obj,
        companyID: this.companyID,
        text: "Rename Account",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      if(template){
        this.fetchTreeData();
      }
    });
  }

  save() {
    debugger;
    this.loading = true;
    const gbAcFactsAccounts: CompanyGBFactMappingDto[] = this.mapGbFactListDtoTocompanyGBFactMapping(this.selectedNodes);
    this.companyAccountService.createOrUpdateCompanyFactsByList(gbAcFactsAccounts).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
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
  mapGbFactListDtoTocompanyGBFactMapping(companyGBFactMapping: GbFactListDto[]): CompanyGBFactMappingDto[] {
    return companyGBFactMapping.map(dto => ({
      companyID: this.companyID,
      gbFactID: dto.gbFactID,
      parentID: dto.parentId,
      customFactName: dto.gbFact,
      aCustomFactName: dto.agbFact

    }));
  }
}

