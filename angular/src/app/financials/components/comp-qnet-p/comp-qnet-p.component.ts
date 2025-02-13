import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { Financial_CompQnetP } from 'src/app/services/permissions';
import { CommonModule, NgFor } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CompaniesQNetProfitDto, CompaniesQNetProfitService } from '@proxy/companies-qnet-profits';
import { CommonService } from '@proxy/commons';
import * as moment from 'moment';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-comp-qnet-p',
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
  templateUrl: './comp-qnet-p.component.html',
  styleUrl: './comp-qnet-p.component.scss'
})
export class CompQnetPComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  rate:number = 0;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  periodTypes = [];
  qPeriods = [];
  divindedDates = [];
  companiesQNetProfits:CompaniesQNetProfitDto[] = [];
  companiesQNetProfit : CompaniesQNetProfitDto = {
    compQNProfitID: 0,
    companyID: 0,
    year: 0,
    qPeriodID: 0,
    periodTypeID: 0,
    isYearly: false,
    netProfit: 0
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService,
    private commonService: CommonService,
    private companiesQNetProfitService: CompaniesQNetProfitService,
  ){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Delete')) {
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
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
      }
      else {this.loading = false;}
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
        this.periodTypes = res.periodTypes;
        this.qPeriods = res.qPeriods;
        if (this.companiesTickers.length > 0) this.getCompaniesQNetProfitsByCompanyID();
        else this.loading = false;
      });
  }

  getCompaniesQNetProfitsByCompanyID() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companiesQNetProfitService
      .getCompaniesQNetProfitsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.companiesQNetProfits = res.companiesQNetProfits;
        if (this.companiesQNetProfits.length > 0)
          this.handleCompaniesQNetProfit(this.companiesQNetProfits[0]);
        else this.loading = false;
      });
  }

  handleCompaniesQNetProfit(companiesQNetProfit: CompaniesQNetProfitDto) {
    debugger;
    this.companiesQNetProfit = companiesQNetProfit;
    if(this.companiesQNetProfit.asOfDate)
      this.companiesQNetProfit.asOfDate = moment(this.companiesQNetProfit.asOfDate).format("MM/DD/YYYY")
    if(this.companiesQNetProfit.announcementDate)
      this.companiesQNetProfit.announcementDate = moment(this.companiesQNetProfit.announcementDate).format("MM/DD/YYYY")
    this.loading = false;
  }

  addNewCompaniesQNetProfit() {
    this.companiesQNetProfit = {
      compQNProfitID: 0,
      companyID: 0,
      year: 0,
      qPeriodID: 0,
      periodTypeID: 0,
      isYearly: false,
      netProfit: 0
    };
  }

  insertUpdateCalculateCompQuartersNetProfitByInput() {
    debugger;
    this.loading = true;
    this.companiesQNetProfit.companyID = this.companyID;
    this.companiesQNetProfit.asOfDate = moment(this.companiesQNetProfit.asOfDate).format();
    this.companiesQNetProfit.announcementDate = moment(this.companiesQNetProfit.announcementDate).format();
   
    
   
    this.companiesQNetProfitService.insertUpdateCalculateCompQuartersNetProfitByInput(this.companiesQNetProfit).subscribe(res => {
      debugger;
      if (this.companiesQNetProfit.compQNProfitID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companiesQNetProfit.remarks + ' updated successfully', icon: 'success', });
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companiesQNetProfit.remarks + ' created successfully', icon: 'success', });
      }
      this.addNewCompaniesQNetProfit();
      this.getCompaniesQNetProfitsByCompanyID();
      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
   deleteCorporateAnnouncement(Id :number) {
      
      Swal.fire({
        title: 'Confirm Deletion',
        text: "Are you sure you want to delete this Quarters NetProfit?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
  
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.companiesQNetProfitService.deleteCompQuartersNetProfitByCompQNProfitID(Id).subscribe((res) => {
            Swal.fire({
              title: 'Success',
              text: 'Quarters NetProfit Deleted Successfully',
              icon: 'success',
            }).then((result) => {
           
              this.loading = false;
              this.addNewCompaniesQNetProfit();
              this.getCompaniesQNetProfitsByCompanyID();
            });
  
          });
        }
      })
    }

}
