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
  // @ViewChild('companysectorRef') companySector: CompanySectorComponent;
  // @Input() stockMarketIDinput;
  // @Input() sectorIDinput;
  filteredCountries: any[];
  items: any[] = [];
  clickedIndex = 0;
  companyID = 0;
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
  stockMarketID:number;
  selectedSectorFromAutoComp:boolean = false;
  sectorID: number = 0;
  lastsectorID: number = this.sectorID;
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
    logo: null,
    attributes: false,
    activeIndices: false,
     
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
      if (this.markets.length > 0) this.stockMarketID = this.markets[0].stockMarketID; this.fillCompByMarketId();
    });
  }

//   search(event: AutoCompleteCompleteEvent) {
//     this.suggestions = this.companies.map(item => item.company);
// }

search(event: AutoCompleteCompleteEvent) {
    
  this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
    this.suggestions = res;
    
  });
}

onSelect(event: any) {
  
  this.loading =true;
  this.company.stockMarketID = event.value.stockMarketID;
  this.sectorID = event.value.sectorID;
  this.companyID = event.value.companyID;
  this.selectedSectorFromAutoComp = true;
  this.lastsectorID = this.sectorID;
  this.fillCompByMarketId();
  this.selectedItem = null;
  this.loading =false;
}
onListBoxSelectionChange(event: any) {
  if(this.sectorID == null)
    this.sectorID = this.lastsectorID;
  else
  this.lastsectorID = this.sectorID;
}

  fillCompByMarketId() {
 //  this.loading = true;
    this.commonService.getCompMSectorsByMarketID(this.company.stockMarketID).subscribe(res => {
      debugger;
      this.gbIndustrialGroups = res.gbIndustrialGroups;
      this.sectors = res.sectors;
      this.internalCategories = res.internalCategories;
      this.currencies = res.currencies;
      this.subCurrencies = res.subCurrencies;
      this.capSizes = res.capSizes;
      this.marketSectors = res.marketSectors;
      // this.sectorID = this.marketSectors[0].sectorID;
      if(!this.selectedSectorFromAutoComp)
        this.sectorID = this.marketSectors[0].sectorID ?? 0;
      else
        this.selectedSectorFromAutoComp = false;
      this.getCompanies();
    //  this.loading = false;
      if (this.compDropdown) {
        
      }
    });
  }

  getCompanies() {
     this.loading = true;
     this.clickedIndex = 0;
    this.companyService
      .getCompaniesBySectorIDAndStockMarketID(this.sectorID, this.company.stockMarketID)
      .subscribe(res => {
        
        this.companies = res;
        
         debugger;
        if (this.companies.length > 0) {
          if(this.companyID > 0){
            this.handleCompany(this.companies.find(f => f.companyID == this.companyID));
            this.clickedIndex = this.companies.findIndex(f => f.companyID == this.companyID);
            this.companyID = 0;            
          }            
          else
            this.handleCompany(this.companies[0]);
        }else{
          this.addNewCompany();
        }
         this.loading = false;
      });
  }

  onUpload(event) {
    if (event.files.length > 0) {
    let fileReader = new FileReader();
    for (let file of event.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
          // Will print the base64 here.
          console.log(fileReader.result);
          
      };
      this.company.logo = [1,2];
    }
  }else
  {
    this.company.logo = null
  }
  }

  
  
 
  handleCompany(company: CompanyDto) {
     
    this.company = company;
    // this.company.stockMarketID = this.stockMarketID;
    // this.company.sectorID = this.sectorID;
    this.lastsectorID = company.sectorID;
    this.companyActivation = this.company.isActive ? 1 : 0;
    if (this.company.establishmentDate) {
      const date = new Date(this.company.establishmentDate); // Convert string to Date
    
      this.company.establishmentDate =
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +  // MM
        ('0' + date.getDate()).slice(-2) + '-' +        // DD
        date.getFullYear();                             // YYYY
    }                           // YYYY
    
    
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
    
    this.loading = true;
    this.company.isActive = this.companyActivation == 1 ? true : false;
    if (!this.company.logo || this.company.logo.length === 0) {
      this.company.logo=null;
    }
    
    this.companyService.createOrUpdateCompanyByModel(this.company).subscribe(res => {
       
      if(this.company.companyID > 0)
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.company.company + ' updated successfully', icon: 'success', });
      else
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.company.company + ' created successfully', icon: 'success', });
        this.company.companyID =res.companyID

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

 
}
