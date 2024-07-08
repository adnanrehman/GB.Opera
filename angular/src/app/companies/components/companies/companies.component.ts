import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CommonService, CompDropdownDto } from '@proxy/commons';
import { NgFor } from '@angular/common';
import { CompanyDto, CompanyService } from '@proxy/companies';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,NgFor ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  filteredCountries: any[];
  compDropdown!:CompDropdownDto;
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
    activeIndices: false,
    financialCurrencyID: 0,
    tradingMainCurrencyID: 0,
    tradingSubCurrencyID: 0,
    isActive: false,
    orderID: 0,
    logo: []
  };
  companies: any[] = [];
  markets = []; 
  marketID:number;
  constructor(private commonService: CommonService,
    private companyService:CompanyService
  ) {
  }

  ngOnInit() { 
    this.getCompStockMarkets();
    this.company.stockMarketID = 0;
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
  }

  getCompStockMarkets(){
    this.commonService.getCompStockMarkets().subscribe((res => {
        this.markets = res;
    }));
  }

  fillCompByMarketId(){
    this.commonService.getCompMSectorsByMarketID(this.company.stockMarketID).subscribe((res => {
      debugger;
      this.compDropdown = res;
      if(this.compDropdown)
      this.getCompanies(this.compDropdown.marketSectors[0].sectorID);

  }));
  }

  getCompanies(sectorID: number){
    this.companyService.getCompaniesBySectorIDAndStockMarketID(sectorID,this.company.stockMarketID).subscribe((res => {
      debugger;
      this.companies = res;
      if(this.companies.length > 0)
        this.handleCompany(this.companies[0]);
  }));
  }

  handleCompany(company:CompanyDto){
    debugger;
    this.company = company;
  }
  
}
