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
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { CompanyPSRawService, PSRCompanyProductDto, PSRCompanyRawMaterialDto, PSRCompanyServiceDto } from '@proxy/company-psraws';
import { Company_CompaniesProductsServicesRawMaterialsUpdates } from 'src/app/services/permissions';
import { PermissionService } from '@abp/ng.core';

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
    NgIf,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule,CommonModule
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
  clickedIndex = 0;
  stockMarketID: number;
  companyID: number;
  productServiceRawID: number;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  psrCompanyServices = [];
  psrCompanyProducts = [];
  psrCompanyRawMaterials = [];
  tree: TreeNode[];
  data: TreeNode[];
  psrMappings: any[];
  selectedNode: TreeNode;
  selectedNodes: any[] = [];
  psrCompanyServiceActivation!: number;
  psrCompanyProductActivation!: number;
  psrCompanyRawMaterialActivation!: number;
  psrCompanyService: PSRCompanyServiceDto = {
    compServiceID: 0,
    companyID: 0,
    productServiceRawID: 0,
    parentID: 0,
    isActive: false
  }
  psrCompanyProduct: PSRCompanyProductDto = {
    compProductID: 0,
    companyID: 0,
    productServiceRawID: 0,
    parentID: 0,
    isActive: false
  }
  psrCompanyRawMaterial: PSRCompanyRawMaterialDto = {
    compRawID: 0,
    companyID: 0,
    productServiceRawID: 0,
    parentID: 0,
    isActive: false
  }
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private companyPSRawService: CompanyPSRawService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_CompaniesProductsServicesRawMaterialsUpdates + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_CompaniesProductsServicesRawMaterialsUpdates + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_CompaniesProductsServicesRawMaterialsUpdates + '.Delete')) {
      this.permission.delete = true;
    }
    this.getMarketLangAnnouncements();
    // this.stockMarketID = 0;
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
      if (this.companyMarketSectors.length > 0){
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
        if (this.companiesTickers.length > 0){
          this.companyID = this.companiesTickers[0].companyID;
          this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
        } 
        else this.loading = false;
      });
  }

  getCompanyPSRawsByProductServiceRawIDAndCompanyID(): void {
    debugger; // For debugging purposes
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    if (this.productServiceRawID == undefined && this.psrMappings.length > 0)
      this.productServiceRawID = this.psrMappings[0].productServiceRawID;
    this.companyPSRawService.getCompanyPSRawsByProductServiceRawIDAndCompanyID(this.productServiceRawID, this.companyID).subscribe(res => {
      this.psrCompanyServices = res.psrCompanyServices;
      this.psrCompanyProducts = res.psrCompanyProducts;
      this.psrCompanyRawMaterials = res.psrCompanyRawMaterials;
      if (res.productServiceRawID == 1) {
        if (this.psrCompanyProducts.length > 0) { this.handlePSRCompanyProduct(this.psrCompanyProducts[0]); }
        else {
          this.loading = false;

          this.psrCompanyProduct = {
            compProductID: 0,
            companyID: 0,
            productServiceRawID: 0,
            parentID: 0,
            isActive: false
          }

        }
      }
      else if (res.productServiceRawID == 2) {
        if (this.psrCompanyServices.length > 0) { this.handlePSRCompanyService(this.psrCompanyServices[0]); }
        else {
          this.loading = false;
          this.psrCompanyService = {
            compServiceID: 0,
            companyID: 0,
            productServiceRawID: 0,
            parentID: 0,
            isActive: false
          }
        }
      }
      else if (res.productServiceRawID == 3) {
        if (this.psrCompanyRawMaterials.length > 0) { this.handlePSRCompanyRawMaterial(this.psrCompanyRawMaterials[0]); }
        else {
          this.loading = false;
          this.psrCompanyRawMaterial = {
            compRawID: 0,
            companyID: 0,
            productServiceRawID: 0,
            parentID: 0,
            isActive: false
          }
        }
      }

    });
  }


  handlePSRCompanyService(psrCompanyService: PSRCompanyServiceDto) {
    debugger;
    this.psrCompanyService = psrCompanyService
    this.psrCompanyServiceActivation = this.psrCompanyService.isActive ? 1 : 0;
    this.loading = false;
  }

  handlePSRCompanyProduct(psrCompanyProduct: PSRCompanyProductDto) {
    debugger;
    this.psrCompanyProduct = psrCompanyProduct
    this.psrCompanyProductActivation = this.psrCompanyProduct.isActive ? 1 : 0;
    this.loading = false;
  }

  handlePSRCompanyRawMaterial(psrCompanyRawMaterial: PSRCompanyRawMaterialDto) {
    debugger;
    this.psrCompanyRawMaterial = psrCompanyRawMaterial
    this.psrCompanyRawMaterialActivation = this.psrCompanyRawMaterial.isActive ? 1 : 0;
    this.loading = false;
  }

  onNodeClick(event: any) {
    debugger;
    if (event.node.productServiceRawID > 0 && event.node.productServiceRawID < 4) {
      this.productServiceRawID = event.node.productServiceRawID;
      this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
    } else {
      this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
    }

    // this.handlecompanyPSRaw(event.node);
  }

  NodeSelection(list: any[], productServiceRawID: number) {
    for (let x of list) {
      if (x.productServiceRawID == productServiceRawID) {
        let newItem: TreeNode = {
          ...x,
          label: x.name || '', // Assign gbFact to label or default to empty string
          parent: null,
          expanded: true,
          selectable: true,
          data: x.name,
          partialSelected: true,
          children: []
        };
        this.selectedNode = newItem;
        this.loading = false;
        return true;
      }
      if (x.children.length !== 0) {
        var result = this.NodeSelection(x.children, productServiceRawID);
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

  savePSRCompanyService() {
    debugger;
    this.loading = true;
    this.psrCompanyService.isActive = this.psrCompanyServiceActivation == 1 ? true : false;
    this.psrCompanyService.companyID = this.companyID;
    this.psrCompanyService.serviceStart = new Date(this.psrCompanyService.serviceStart).toLocaleString();
    this.psrCompanyService.productServiceRawID = this.productServiceRawID;
    this.companyPSRawService.createOrUpdatePSRCompanyServiceByModel(this.psrCompanyService).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
        this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
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
  savePSRCompanyProduct() {
    debugger;
    this.loading = true;
    this.psrCompanyProduct.isActive = this.psrCompanyProductActivation == 1 ? true : false;
    this.psrCompanyProduct.companyID = this.companyID;
    this.psrCompanyProduct.productionStart = new Date(this.psrCompanyProduct.productionStart).toLocaleString();
    this.psrCompanyProduct.productServiceRawID = this.productServiceRawID;
    this.companyPSRawService.createOrUpdatePSRCompanyProductByModel(this.psrCompanyProduct).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
        this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
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
  savePSRCompanyRawMaterial() {
    debugger;
    this.loading = true;
    this.psrCompanyRawMaterial.isActive = this.psrCompanyRawMaterialActivation == 1 ? true : false;
    this.psrCompanyRawMaterial.companyID = this.companyID;
    this.psrCompanyRawMaterial.productServiceRawID = this.productServiceRawID;
    this.companyPSRawService.createOrUpdatePSRCompanyRawMaterialByModel(this.psrCompanyRawMaterial).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
        this.getCompanyPSRawsByProductServiceRawIDAndCompanyID();
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
