import { Component, Input, NgModule, ViewChild } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CommonService, CompDropdownDto } from '@proxy/commons';
import { CommonModule, NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';
import { CompanyDto, CompanyService } from '@proxy/companies';
import { FilterService } from 'primeng/api';
import { FileService } from 'src/app/services/file/file.service';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { CompanySectorComponent } from 'src/app/common/components/company-sector/company-sector.component';
import Swal from 'sweetalert2';
import { AppModule } from 'src/app/app.module';
import { CompaniesModule } from '../../companies.module';
import { CompanyAutocompleteComponent } from 'src/app/common/components/company-autocomplete/company-autocomplete.component';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { PermissionService } from '@abp/ng.core';
import { Company_Company } from 'src/app/services/permissions';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
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
    CompanySectorComponent,
    CompanyAutocompleteComponent
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent {
  @ViewChild('imgContactAvatar') imgContactAvatar!: FileUpload;
  @ViewChild('companysectorRef') companySector: CompanySectorComponent;
  @Input() stockMarketIDinput;
  @Input() sectorIDinput;
  filteredCountries: any[];
  items: any[] = [];
  selectedItem: any;
  loading:boolean = false;
  suggestions: any[] = [];
  gbIndustrialGroups: any[] = [];
  sectors: any[] = [];
  internalCategories: any[] = [];
  currencies: any[] = [];
  subCurrencies: any[] = [];
  capSizes: any[] = [];
  marketSectors: any[] = [];
  companyActivation!: number;
  sectorID:number;
  activationDropdown: any[] = 
  [
    {value:0,displayText:"No"},
    {value:1,displayText:"Yes"}
  ]
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  compDropdown!: CompDropdownDto;
  company: CompanyDto = {
    companyID: 0,
    stockMarketID: 0,
    sectorID: 0,
    capSizeID: 0,
    gbSectorID: 0,
    gbIndustrialGroupsID: 0,
    gbIndustryID: 0,
    internalCategoryID: 0,
    mainCompany: false,
    hasFunds: false,
    financialCurrencyID: 0,
    tradingMainCurrencyID: 0,
    tradingSubCurrencyID: 0,
    isActive: false,
    orderID: 0,
    logo: [],
    attributes: false,
    activeIndices: false
  };
  companies: any[] = [];
  markets = [];
  marketID: number;
  constructor(private commonService: CommonService, 
    public fileService: FileService,
    private companyService: CompanyService, private permissionService: PermissionService) {
      this.permission = {
        create: false,
        edit : false,
        delete  :false
      }
      
    }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_Company + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Company + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Company + '.delete')) {
      this.permission.delete = true;
    }
    this.getCompStockMarkets();
    this.company.stockMarketID = 0;
  }

  getCompStockMarkets() {
    this.commonService.getCompStockMarkets().subscribe(res => {
      this.markets = res;
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = this.companies.map(item => item.company);
}

  fillCompByMarketId() {
    this.loading = true;
    this.commonService.getCompMSectorsByMarketID(this.company.stockMarketID).subscribe(res => {
      debugger;
      this.gbIndustrialGroups = res.gbIndustrialGroups;
      this.sectors = res.sectors;
      this.internalCategories = res.internalCategories;
      this.currencies = res.currencies;
      this.subCurrencies = res.subCurrencies;
      this.capSizes = res.capSizes;
      this.marketSectors = res.marketSectors;
      this.loading = false;
      if (this.compDropdown) {
        this.sectorID = this.marketSectors[0].sectorID
        this.getCompanies();
      }
    });
  }

  getCompanies() {
    this.loading = true;
    this.companyService
      .getCompaniesBySectorIDAndStockMarketID(this.sectorID, this.company.stockMarketID)
      .subscribe(res => {
        debugger;
        this.companies = res;
        if (this.companies.length > 0) this.handleCompany(this.companies[0]);
        this.loading = false;
      });
  }

  onUpload(event) {
    let fileReader = new FileReader();
    for (let file of event.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
          // Will print the base64 here.
          console.log(fileReader.result);
          
      };
      this.company.logo = [1,2];
    }
  }

  
  

  handleCompany(company: CompanyDto) {
    debugger;
    this.company = company;
    this.companyActivation = this.company.isActive ? 1 : 0;
  }

  addNewCompany() {
    var stockMarketId = this.company.stockMarketID;
    this.company = {
      companyID: 0,
      stockMarketID: stockMarketId,
      sectorID: 0,
      capSizeID: 0,
      gbSectorID: 0,
      gbIndustrialGroupsID: 0,
      gbIndustryID: 0,
      internalCategoryID: 0,
      mainCompany: false,
      hasFunds: false,
      financialCurrencyID: 0,
      tradingMainCurrencyID: 0,
      tradingSubCurrencyID: 0,
      isActive: false,
      orderID: 0,
      logo: [],
      attributes: false,
      activeIndices: false,
    };
  }

  createOrUpdateCompany() {
    debugger;
    this.loading = true;
    this.company.isActive = this.companyActivation == 1 ? true : false;
    this.companyService.createOrUpdateCompanyByModel(this.company).subscribe(res => {
      debugger;
      if(this.company.companyID > 0)
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.company.company + ' updated successfully', icon: 'success', });
      else
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.company.company + ' created successfully', icon: 'success', });
      this.handleCompany(this.company);
      this.loading = false;
    },
    error => {
      this.loading = false;
    },
    () => {
      this.loading = false;
    });
  }

  uploadLogo(){
    this.loading = true;
    this.fileService.uploadFile(this.imgContactAvatar._files[0])
        .subscribe((res: any) => {
          this.company.logo = res;
          this.loading = false;
        });
  }

  handleDataFromChild(companies: []) {
    debugger;
    this.companies = companies;
    this.fillCompByMarketId()
    this.company.stockMarketID = this.companySector.stockMarketID;
    if (this.companies.length > 0) this.handleCompany(this.companies[0]);
}

handleDataFromAutoCompelete(company: CompanyDto) {
  debugger;
  this.company = company;
  this.fillCompByMarketId()
  this.companySector.stockMarketID = company.stockMarketID;
  this.companySector.sectorID = company.sectorID;
  this.companySector.fillCompByMarketId();
  this.companySector.getCompanies()
  this.companyActivation = this.company.isActive ? 1 : 0;
}
}
