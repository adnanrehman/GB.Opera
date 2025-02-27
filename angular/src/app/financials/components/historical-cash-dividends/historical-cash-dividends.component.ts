import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { CreateHistoricalCashDividendDto, HistoricalCashDividendDto, HistoricalCashDividendService } from '@proxy/historical-cash-dividends';
import * as moment from 'moment';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { Financial_HistoricalCashDividends } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historical-cash-dividends',
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
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './historical-cash-dividends.component.html',
  styleUrl: './historical-cash-dividends.component.scss'
})
export class HistoricalCashDividendsComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number = 0;
  lastcompanyID: number = this.companyID;
  rate:number = 0;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  ePeriods = [];
  sources = [];
  divindedDates = [];
  historicalCashDividends:HistoricalCashDividendDto[] = [];
  historicalCashDividend : HistoricalCashDividendDto = {
    cashDivID: 0,
    companyID: 0,
    sourceID: 0,
    cashDivDates: [],
    asOf: false,
    announcedOn: false,
    approvedOn: false,
    dueOn: false,
    xDividendDate: false
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService, 
    private historicalCashDividendService:HistoricalCashDividendService,
    private commonService: CommonService
  ){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.Delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
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
    this.getCompMSectorsByMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getCompStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if(this.stockMarkets.length > 0){
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getCompMSectorsByMarketID();
      }
    });
  }

  getCompMSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res.marketSectors;
      if (this.companyMarketSectors.length > 0) {
        this.getSectorCompaniesBySectorIDAndStockMarketID()
      }
      else this.loading = false;
    });
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getCompaniesForQNPBySectorIDAndMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res.companies;
        if (this.companiesTickers.length > 0) this.getHistoricalCashDividendsByCompanyID();
        else this.loading = false;
      });
  }

  getHistoricalCashDividendsByCompanyID() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.historicalCashDividendService
      .getHistoricalCashDividendsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.historicalCashDividends = res.historicalCashDividends;
        this.divindedDates = this.historicalCashDividend.cashDivDates;
        this.ePeriods = res.ePeriods;
        this.sources = res.sources;
        this.loading = false;
        if (this.historicalCashDividends.length > 0)
          this.handleHistoricalCashDividend(this.historicalCashDividends[0]);
        else this.loading = false;
      });
  }

  handleDivDates(){
    this.divindedDates = []
    if(this.historicalCashDividend.asOf){
      this.divindedDates.push(
        {cashDivID:this.historicalCashDividend.cashDivID, dateSelection:"As of",cashDivDate:this.historicalCashDividend.asOfDateTime},
      )
    }
    if(this.historicalCashDividend.announcedOn){
      this.divindedDates.push(
        {cashDivID:this.historicalCashDividend.cashDivID, dateSelection:"Announced on",cashDivDate:this.historicalCashDividend.announcedOnDateTime},
      )
    }
    if(this.historicalCashDividend.approvedOn){
      this.divindedDates.push(
        {cashDivID:this.historicalCashDividend.cashDivID, dateSelection:"Approved on",cashDivDate:this.historicalCashDividend.approvedOnDateTime},
      )
    }
    if(this.historicalCashDividend.dueOn){
      this.divindedDates.push(
        {cashDivID:this.historicalCashDividend.cashDivID, dateSelection:"Due on",cashDivDate:this.historicalCashDividend.dueOnDateTime},
      )
    }
    if(this.historicalCashDividend.xDividendDate){
      this.divindedDates.push(
        {cashDivID:this.historicalCashDividend.cashDivID, dateSelection:"X-dividend Date",cashDivDate:this.historicalCashDividend.xDividendDateTime},
      )
    }
  }

  handleHistoricalCashDividend(historicalCashDividend: HistoricalCashDividendDto) {
    debugger;
    this.historicalCashDividend = historicalCashDividend;
    this.divindedDates = this.historicalCashDividend.cashDivDates;
    if(this.historicalCashDividend.asOfDateTime)
    this.historicalCashDividend.asOfDateTime = moment(this.historicalCashDividend.asOfDateTime).format("MM/DD/YYYY HH:MM")
    if(this.historicalCashDividend.announcedOnDateTime)
      this.historicalCashDividend.announcedOnDateTime = moment(this.historicalCashDividend.announcedOnDateTime).format("MM/DD/YYYY HH:MM")
    if(this.historicalCashDividend.approvedOnDateTime)
      this.historicalCashDividend.approvedOnDateTime = moment(this.historicalCashDividend.approvedOnDateTime).format("MM/DD/YYYY HH:MM")
    if(this.historicalCashDividend.dueOnDateTime)
      this.historicalCashDividend.dueOnDateTime = moment(this.historicalCashDividend.dueOnDateTime).format("MM/DD/YYYY HH:MM")
    if(this.historicalCashDividend.xDividendDateTime)
      this.historicalCashDividend.xDividendDateTime = moment(this.historicalCashDividend.xDividendDateTime).format("MM/DD/YYYY HH:MM")
    this.loading = false;
  }

  addNewHistoricalCashDividend() {
    this.historicalCashDividend = {
      cashDivID: 0,
      companyID: 0,
      sourceID: 0,
      cashDivDates: [],
      asOf: false,
      announcedOn: false,
      approvedOn: false,
      dueOn: false,
      xDividendDate: false
    };
  }

  onListBoxSelectionChange(event: any) {
    if(this.companyID == null)
      this.companyID = this.lastcompanyID;
    else
    this.lastcompanyID = this.companyID;
  }

  insetUpdateHistoricalCashDividendsByInputAndDates() {
    debugger;
    this.loading = true;
    this.historicalCashDividend.companyID = this.companyID;
    // this.historicalCashDividend.asOfDateTime = moment(this.historicalCashDividend.asOfDateTime).format();
    // this.historicalCashDividend.announcedOnDateTime = moment(this.historicalCashDividend.announcedOnDateTime).format();
    // this.historicalCashDividend.approvedOnDateTime = moment(this.historicalCashDividend.approvedOnDateTime).format();
    // this.historicalCashDividend.dueOnDateTime = moment(this.historicalCashDividend.dueOnDateTime).format();
    // this.historicalCashDividend.xDividendDateTime = moment(this.historicalCashDividend.xDividendDateTime).format();
    this.divindedDates.forEach((item, index) => {
      // item.cashDivDate = moment(item.cashDivDate).format();
    });
    var obj: CreateHistoricalCashDividendDto = {
      historicalCashDividend: this.historicalCashDividend,
      cashDivDates: this.divindedDates
    }
    this.historicalCashDividendService.insetUpdateHistoricalCashDividendsByInput(obj).subscribe(res => {
      debugger;
      if (this.historicalCashDividend.cashDivID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.historicalCashDividend.remarks + ' updated successfully', icon: 'success', });
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.historicalCashDividend.remarks + ' created successfully', icon: 'success', });
      }
      this.addNewHistoricalCashDividend();
      this.getHistoricalCashDividendsByCompanyID();
      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
}
