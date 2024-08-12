import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule, NgFor } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CommonService } from '@proxy/commons';

@Component({
  selector: 'app-companies-agencies-and-ratings',
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
    RadioButtonModule,
    NgFor,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './companies-agencies-and-ratings.component.html',
  styleUrl: './companies-agencies-and-ratings.component.scss'
})
export class CompaniesAgenciesAndRatingsComponent {
  filteredCountries: any[];
  ingredient:any;
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
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];

  constructor(
    private commonService: CommonService,
  ) {}
  ngOnInit() { 
    this.getStockMarkets();
    this.stockMarketID = 0;
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
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
        this.loading = false;
      });
  }
}
