import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabView, TabViewModule } from 'primeng/tabview';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { CommonService } from '@proxy/commons';
import { SubsidiaryDto, SubsCompUpdDto, CompanyProductDto, CompanyRawMaterialDto, CompanyFIPDto, CompanyOwnershipDto, SisterCompanyDto, MiscNotesDto, CompanyOwnershipService } from '@proxy/company-ownerships';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ownership-companies',
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
  ],
  templateUrl: './ownership-companies.component.html',
  styleUrl: './ownership-companies.component.scss'
})
export class OwnershipCompaniesComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companySubsidiaries: any = {};
  subsidiaries = [];
  subsCompUpds = [];
  sisterCompanies = [];
  companyproducts = [];
  companyrawmaterials = [];
  companyFIPs = [];
  miscNotes = [];
  companyProjects = [];
  projectStatuses = [];
  filteredCountries: any[];
  subsidiary: SubsidiaryDto = {
    subsidiaryID: 0,
    companyID: 0,
  };
  subsCompUpd: SubsCompUpdDto = {
    subsCompUpdID: 0,
    companyID: 0,
  };
  siterCompany: SisterCompanyDto = {
    companyID: 0,
    sisterCompanyID: 0,
    isActive: false
  };
  companyproduct: CompanyProductDto = {
    companyID: 0,
    companyProductID: 0
  };
  companyrawmaterial: CompanyRawMaterialDto = {
    companyID: 0,
    isActive: false,
    rawMaterialID: 0
  };
  companyFIP: CompanyFIPDto = {
    companyID: 0,
    isActive: false,
    fipid: 0
  };
  miscNote: MiscNotesDto = {
    companyID: 0,
    miscNotesID: 0,
    isActive: false
  };
  companySubsidiary: CompanyOwnershipDto = {
    subsidiaries: [],
    subsCompUpds: [],
    sisterCompanies: [],
    companyFIPs: [],
    miscNotes: [],
    companyProducts: [],
    companyRawMaterials: []
  };

  subsidiaryActivation!: number;
  subsCompUpdActivation!: number;
  siterCompanyActivation!: number;
  companyproductActivation!: number;
  companyrawmaterialActivation!: number;
  companyFIPActivation!: number;
  miscNotermationActivation!: number;
  companyProjectActivation!: number;
  projectStatusActivation!: number;
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];

  markets = [
    { name: 'TASI' },
    { name: 'ReactJS' },
    { name: 'Angular' },
    { name: 'Bootstrap' },
    { name: 'PrimeNG' },
  ];

  constructor(
    private commonService: CommonService,
    private companyOwnershipService: CompanyOwnershipService
  ) {}

  ngOnInit() {
    this.getStockMarkets();
    this.stockMarketID = 0;
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
    this.getStockMarketSectorsByStockMarketID();
    this.loading =false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getSectorCompaniesBySectorIDAndStockMarketID();
      else this.loading = false;
    });
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0) this.getCompanySubsidiaries();
        else this.loading = false;
      });
  }

  getCompanySubsidiaries() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companyOwnershipService
      .getRelatedInformationsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.companySubsidiaries = res;
        if (this.companySubsidiaries.subsidiaries.length > 0)
          this.handleCompanyOwnership(this.companySubsidiaries);
        else this.loading = false;
      });
  }

  handleCompanyOwnership(companyOwnership: CompanyOwnershipDto) {
    debugger;
    this.subsidiaries = companyOwnership.subsidiaries;
    this.subsCompUpds = companyOwnership.subsCompUpds;
    this.sisterCompanies = companyOwnership.sisterCompanies;
    this.companyproducts = companyOwnership.companyProducts;
    this.companyrawmaterials = companyOwnership.companyRawMaterials;
    this.companyFIPs = companyOwnership.companyFIPs;
    this.miscNotes = companyOwnership.miscNotes;
    this.loading = false;
    if (this.subsidiaries.length > 0) this.handleSubsidiary(this.subsidiaries[0]);
    else this.loading = false;
  }

  handleSubsidiary(subsidiary: SubsidiaryDto) {
    debugger;
    this.subsidiary = subsidiary;
    if(this.headerValue == undefined)
      this.headerValue = 'Subsidiaries';
  }
  handlesubsCompUpd(subsCompUpd: SubsCompUpdDto) {
    this.subsCompUpd = subsCompUpd;
  }
  handlesiterCompany(siterCompany: SisterCompanyDto) {
    this.siterCompany = siterCompany;
    this.siterCompanyActivation = this.siterCompany.isActive ? 1 : 0;
  }
  handlecompanyproduct(companyproduct: CompanyProductDto) {
    this.companyproduct = companyproduct;
    this.companyproductActivation = this.companyproduct.isActive ? 1 : 0;
  }
  handleCompanyRawMaterial(companyrawmaterial: CompanyRawMaterialDto) {
    this.companyrawmaterial = companyrawmaterial;
    this.companyrawmaterialActivation = this.companyrawmaterial.isActive ? 1 : 0;
  }
  handlecompanyFIP(companyFIP: CompanyFIPDto) {
    this.companyFIP = companyFIP;
    this.companyFIPActivation = this.companyFIP.isActive ? 1 : 0;
  }
  handlemiscNote(miscNote: MiscNotesDto) {
    this.miscNote = miscNote;
    this.miscNotermationActivation = this.miscNote.isActive ? 1 : 0;
  }

  tabViewChange(event, tabView: TabView) {
    debugger;
    this.headerValue = tabView.tabs[event.index].header;
  }

  addNewCompanySubsidiary() {
    this.companySubsidiary = {
      subsidiaries: [],
      subsCompUpds: [],
      sisterCompanies: [],
      companyFIPs: [],
      miscNotes: [],
      companyProducts:[],
      companyRawMaterials:[]
    };
  }

  saveOwnership() {
    if (this.companyID == undefined) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'error!',
        text: 'Please select first any Company',
        icon: 'error',
      });
    }
    if (this.headerValue == 'Subsidiaries') this.createOrUpdateCompanySubsidiary();
    if (this.headerValue == 'Subsidiaries') this.createOrUpdateSubsCompUpd();
    if (this.headerValue == 'Products') this.createOrUpdateCompanyProducts();
    if (this.headerValue == 'Sister Companies') this.createOrUpdateSisterCompany();
    if (this.headerValue == 'Raw Materials') this.createOrUpdateCompanyRawMaterials();
    if (this.headerValue == 'Foriegn Investment Options') this.createOrUpdateCompanyFIP();
    if (this.headerValue == 'MiscNotes') this.createOrUpdateMiscNote();
  }

  addNewOwnership() {
    if (this.headerValue == 'Subsidiaries') {
      this.subsidiary = {
        subsidiaryID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Subsidiaries') {
      this.subsCompUpd = {
        subsCompUpdID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Products') {
      this.companyproduct = {
        companyProductID:0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Sister Companies') {
      this.siterCompany = {
        sisterCompanyID: 0,
        companyID: 0,
        isActive:false
      };
    }
    if (this.headerValue == 'Raw Materials') {
      this.companyrawmaterial = {
        rawMaterialID:0,
        companyID: 0,
        isActive: false,
      };
    }
    if (this.headerValue == 'Foriegn Investment Options') {
      this.companyFIP = {
        fipid: 0,
        companyID: 0,
        isActive: false,
      };
    }
    if (this.headerValue == 'MiscNotes') {
      this.miscNote = {
        miscNotesID: 0,
        companyID: 0,
        isActive:false
      };
    }
  }

  createOrUpdateCompanySubsidiary() {
    this.loading = true;
    if (this.subsidiary.companyID == 0) this.subsidiary.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateSubsidiaryByModel(this.subsidiary).subscribe(
      res => {
        debugger;
        if (this.subsidiary.subsidiaryID > 0) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.subsidiary.subsidiaryCompany + ' updated successfully',
            icon: 'success',
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.subsidiary.subsidiaryCompany + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.subsidiaries = res.subsidiaries;
            });
        }

        this.handleSubsidiary(this.subsidiary);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  createOrUpdateSubsCompUpd() {
    this.loading = true;
    if (this.subsCompUpd.companyID == 0) this.subsCompUpd.companyID = this.companyID;
    this.companyOwnershipService
      .createOrUpdateSubsCompUpdateByModel(this.subsCompUpd)
      .subscribe(
        res => {
          debugger;
          if (this.subsCompUpd.subsCompUpdID > 0){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.subsCompUpd.remarks + ' updated successfully',
              icon: 'success',
            });
          }
          else{
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.subsCompUpd.remarks + ' created successfully',
              icon: 'success',
            });
            this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.subsCompUpds = res.subsCompUpds;
            });
          }
          this.handlesubsCompUpd(this.subsCompUpd);
          this.loading = false;
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }
  createOrUpdateSisterCompany() {
    this.loading = true;
    this.siterCompany.isActive = this.siterCompanyActivation == 1 ? true : false;
    if (this.siterCompany.companyID == 0) this.siterCompany.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateSisterCompanyByModel(this.siterCompany).subscribe(
      res => {
        debugger;
        if (this.siterCompany.sisterCompanyID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.siterCompany.sisterCompany + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.siterCompany.sisterCompany + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.sisterCompanies = res.sisterCompanies;
            });
        }
        this.handlesiterCompany(this.siterCompany);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  createOrUpdateCompanyProducts() {
    this.loading = true;
    this.companyproduct.isActive = this.companyproductActivation == 1 ? true : false;
    if (this.companyproduct.companyID == 0) this.companyproduct.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateCompanyProductByModel(this.companyproduct).subscribe(
      res => {
        debugger;
        if (this.companyproduct.companyProductID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyproduct.companyProduct + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyproduct.companyProduct + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.companyproducts = res.companyProducts;
            });
        }
        this.handlecompanyproduct(this.companyproduct);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  createOrUpdateCompanyRawMaterials() {
    this.loading = true;
    this.companyrawmaterial.isActive = this.companyrawmaterialActivation == 1 ? true : false;
    if (this.companyrawmaterial.companyID == 0) this.companyrawmaterial.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateRawMaterialByModel(this.companyrawmaterial).subscribe(
      res => {
        debugger;
        if (this.companyrawmaterial.rawMaterialID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyrawmaterial.rawMaterial + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyrawmaterial.rawMaterial + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.companyrawmaterials = res.companyRawMaterials;
            });
        }
        this.handleCompanyRawMaterial(this.companyrawmaterial);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  createOrUpdateCompanyFIP() {
    this.loading = true;
    this.companyFIP.isActive = this.companyFIPActivation == 1 ? true : false;
    if (this.companyFIP.companyID == 0) this.companyFIP.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateCompanyFIPByModel(this.companyFIP).subscribe(
      res => {
        debugger;
        if (this.companyFIP.fipid > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyFIP.description + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.companyFIP.description + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.companyFIPs = res.companyFIPs;
            });
        }
        this.handlecompanyFIP(this.companyFIP);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  createOrUpdateMiscNote() {
    this.loading = true;
    this.miscNote.isActive = this.miscNotermationActivation == 1 ? true : false;
    if (this.miscNote.companyID == 0) this.miscNote.companyID = this.companyID;
    this.companyOwnershipService.createOrUpdateMiscNoteByModel(this.miscNote).subscribe(
      res => {
        debugger;
        if (this.miscNote.miscNotesID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.miscNote.note + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.miscNote.note + ' created successfully',
            icon: 'success',
          });
          this.companyOwnershipService
            .getRelatedInformationsByCompanyID(this.companyID)
            .subscribe(res => {
              this.miscNotes = res.miscNotes;
            });
        }
        this.handlemiscNote(this.miscNote);
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
