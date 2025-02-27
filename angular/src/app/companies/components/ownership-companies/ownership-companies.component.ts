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
import { PermissionService } from '@abp/ng.core';
import { Company_Ownership } from 'src/app/services/permissions';


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
  companyID: number = 0;
  lastcompanyID: number = this.companyID;
  clickedIndex = 0;
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
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private companyOwnershipService: CompanyOwnershipService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }

  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_Ownership + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Ownership + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Ownership + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    // this.stockMarketID = 0;
  }

  search(event: AutoCompleteCompleteEvent) {
   // this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
    //  this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getStockMarketSectorsByStockMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) {
        if (!this.sectorID)
          this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
      }
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
        if (this.companiesTickers.length > 0) {
          if (!this.companyID)
            this.companyID = this.companiesTickers[0].companyID;
          this.getCompanySubsidiaries();
        }
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
        console.warn(res);

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
    if (this.headerValue == undefined)
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
      companyProducts: [],
      companyRawMaterials: []
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
        companyProductID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Sister Companies') {
      this.siterCompany = {
        sisterCompanyID: 0,
        companyID: 0,
        isActive: false
      };
    }
    if (this.headerValue == 'Raw Materials') {
      this.companyrawmaterial = {
        rawMaterialID: 0,
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
        isActive: false
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

  onListBoxSelectionChange(event: any) {
    if(this.companyID == null)
      this.companyID = this.lastcompanyID;
    else
    this.lastcompanyID = this.companyID;
  }
  createOrUpdateSubsCompUpd() {
    this.loading = true;
    if (this.subsCompUpd.companyID == 0) this.subsCompUpd.companyID = this.companyID;
    this.companyOwnershipService
      .createOrUpdateSubsCompUpdateByModel(this.subsCompUpd)
      .subscribe(
        res => {
          debugger;
          if (this.subsCompUpd.subsCompUpdID > 0) {
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
          else {
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
        if (this.siterCompany.sisterCompanyID > 0) {
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
        else {
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
    if (this.companyproduct.isActive === false) {
      this.companyproduct.companyProductID = 0
    }
    this.companyOwnershipService.createOrUpdateCompanyProductByModel(this.companyproduct).subscribe(
      res => {
        debugger;
        if (this.companyproduct.companyProductID > 0) {
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
        else {
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

    if (this.companyrawmaterial.isActive === false) {
      this.companyrawmaterial.rawMaterialID = 0;
    }
    this.companyOwnershipService.createOrUpdateRawMaterialByModel(this.companyrawmaterial).subscribe(
      res => {
        debugger;
        if (this.companyrawmaterial.rawMaterialID > 0) {
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
        else {
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
    if (this.companyFIP.isActive === false) {
      this.companyFIP.fipid = 0
    }
    this.companyOwnershipService.createOrUpdateCompanyFIPByModel(this.companyFIP).subscribe(
      res => {
        debugger;
        if (this.companyFIP.fipid > 0) {
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
        else {
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
    if (this.companyFIP.isActive === false) {
      this.miscNote.miscNotesID = 0
    }
    this.companyOwnershipService.createOrUpdateMiscNoteByModel(this.miscNote).subscribe(
      res => {
        debugger;
        if (this.miscNote.miscNotesID > 0) {
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
        else {
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
  deleteSubsidiaries(SubsCompUpdID: number) {
    alert(SubsCompUpdID);

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Subsidiaries?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.deleteSubsidiariesBySubsCompUpdID(SubsCompUpdID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Subsidiaries Deleted Successfully',
            icon: 'success',
          }).then((result) => {

            this.loading = false;
            this.getCompanySubsidiaries();

          });

        });
      }
    })
  }


  deleteSisterCompay(SisterCompanyID: number) {


    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this sister company?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.deletesistercompanyBySisterCompanyID(SisterCompanyID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'sister company Deleted Successfully',
            icon: 'success',
          }).then((result) => {

            this.loading = false;

            this.companyOwnershipService
              .getRelatedInformationsByCompanyID(this.companyID)
              .subscribe(res => {
                this.sisterCompanies = res.sisterCompanies;
                this.handlesiterCompany(this.siterCompany);
              });

          });

        });

      }
    })
  }

  deleteproduct(CompanyProductID: number) {


    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Product company?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.deleteCompanyProductsByCompanyProductID(CompanyProductID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Product company Deleted Successfully',
            icon: 'success',
          }).then((result) => {

            this.loading = false;

            this.companyOwnershipService
              .getRelatedInformationsByCompanyID(this.companyID)
              .subscribe(res => {
                this.companyproducts = res.companyProducts;
                this.handlecompanyproduct(this.companyproduct);
              });


          });

        });

      }
    })
  }

  DelteCompanyRawMaterials(RawMaterialID: number) {


    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Raw Materials?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.delteCompanyRawMaterialsByRawMaterialID(RawMaterialID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Raw Materials Deleted Successfully',
            icon: 'success',
          }).then((result) => {



            this.companyOwnershipService
              .getRelatedInformationsByCompanyID(this.companyID)
              .subscribe(res => {
                this.companyrawmaterials = res.companyRawMaterials;
              });

            this.handleCompanyRawMaterial(this.companyrawmaterial);
            this.loading = false;


          });

        });

      }
    })
  }
  DeleteForeignInvestmentPermitted(FIPID: number) {


    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Foreign Investment Options?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.deleteForeignInvestmentPermittedByFIPID(FIPID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Foreign Investment Options Deleted Successfully',
            icon: 'success',
          }).then((result) => {


 
                this.companyOwnershipService
                  .getRelatedInformationsByCompanyID(this.companyID)
                  .subscribe(res => {
                    this.companyFIPs = res.companyFIPs;
                    this.handlecompanyFIP(this.companyFIP);
                  });


            


            this.loading = false;


          });

        });

      }
    })
  }

  DeleteMiscNotes(MiscNotesID: number) {


    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this MISC Note?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companyOwnershipService.deleteMiscNotesByMiscNotesID(MiscNotesID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'MISC Note Options Deleted Successfully',
            icon: 'success',
          }).then((result) => {




            this.companyOwnershipService
              .getRelatedInformationsByCompanyID(this.companyID)
              .subscribe(res => {
                this.miscNotes = res.miscNotes;
                this.handlemiscNote(this.miscNote);
              });






            this.loading = false;


          });

        });

      }
    })
  }
}
