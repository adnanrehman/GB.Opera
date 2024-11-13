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
import { Financial_FinancialsAdmin } from 'src/app/services/permissions';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CommonService } from '@proxy/commons';
import { FinancialsAdminService, NewReviewFinancialDto } from '@proxy/financials-admins';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-financials-admin',
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
  templateUrl: './financials-admin.component.html',
  styleUrl: './financials-admin.component.scss'
})
export class FinancialsAdminComponent {
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
  newReviewFinancials: NewReviewFinancialDto[] = [];
  periodTypes: any[] = [];
  qPeriods: any[] = [];
  users: any[] = [];
  usersList: any[] = [];
  statuses: any[] = [];
  newReviewFinancial: NewReviewFinancialDto = {
    newReviewFinancialID: 0,
    financialsID: 0,
    isAudited: false,
    isActive: false,
    periodTypeID: 0,
    year: 0,
    qPeriodID: 0
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService, private commonService: CommonService,
    private financialsAdminService: FinancialsAdminService
  ){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_FinancialsAdmin + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_FinancialsAdmin + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_FinancialsAdmin + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
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
    this.getStockMarketSectorsByStockMarketID();
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if(this.stockMarkets.length > 0){
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getStockMarketSectorsByStockMarketID();
      }
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
    this.loading =true;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0) this.getNewFinancialReviewsByCompanyID();
        else this.loading = false;
      });
  }

  getNewFinancialReviewsByCompanyID() {
    debugger;
    this.loading =true;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.financialsAdminService
      .getNewFinancialReviewsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.newReviewFinancials = res.newReviewFinancials;
        this.periodTypes = res.periodTypes;
        this.qPeriods = res.qPeriods;
        this.users = res.entryUsers;
        this.usersList = res.reEntryUsers;
        this.statuses = res.statuses;
        if (this.newReviewFinancials.length > 0)
          this.handleNewReviewFinancial(this.newReviewFinancials[0]);
        else this.loading = false;
      });
  }

  handleNewReviewFinancial(newReviewFinancial: NewReviewFinancialDto) {
    this.newReviewFinancial = newReviewFinancial;
    if(this.newReviewFinancial.asOfDate)
      this.newReviewFinancial.asOfDate = moment(this.newReviewFinancial.asOfDate).format("MM/DD/YYYY")
    this.loading = false;
  }

  updateAdminFinancialsByInput() {
    debugger;
    this.loading = true;
    this.newReviewFinancial.asOfDate = moment(this.newReviewFinancial.asOfDate).format();
    this.financialsAdminService.updateAdminFinancialsByInput(this.newReviewFinancial).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newReviewFinancial.qPeriod + ' updated successfully', icon: 'success', });
      this.handleNewReviewFinancial(this.newReviewFinancial);
      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  updateFinancialRateChangesByFinancialIdAndRate() {
    debugger;
    this.loading = true;
    this.financialsAdminService.updateFinancialRateChangesByFinancialIdAndRate(this.newReviewFinancial.financialsID,this.rate).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newReviewFinancial.qPeriod + ' updated successfully', icon: 'success', });
      this.handleNewReviewFinancial(this.newReviewFinancial);
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
