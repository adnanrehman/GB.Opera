import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { MFundCompanies, MFundPrices, MFunds, OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_FundPrices } from 'src/app/services/permissions';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FundPriceService } from '@proxy/fund-prices';
import { FundPrices } from '@proxy';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { CommonService } from '@proxy/commons';

@Component({
  selector: 'app-fund-prices',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule
  ],
  templateUrl: './fund-prices.component.html',
  styleUrl: './fund-prices.component.scss'
})
export class FundPricesComponent {
  loading:boolean = false;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  markets:MFundCompanies[] = [];
  funds:MFunds[] = [];
  fundPrices: MFundPrices[];
  fundPrice : MFundPrices = {
    mFundPriceID: 0,
    mFundID: 0,
    closingPrice: 0,
    tradingVolume: 0,
    lastClosePrice: 0,
    isActive: false
  }
  fundID: number = 0;
  companyID: number = 0;
  
  constructor( private officialIndicsService : OfficialIndicsService,
    private commonService: CommonService,
    private fundPriceService: FundPriceService,
    private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   }

  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Delete')) {
      this.permission.delete = true;
    }
    this.getMFundCompanies();
     
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
    this.companyID = event.value.companyID;
    this.usp_getAllFunds();
    this.loading = false;
  }


  getMFundCompanies() {
    debugger;
    this.loading =true;
    this.officialIndicsService.getMFundCompanies().subscribe(res => {
      this.markets = res;
      if(this.markets.length > 0){
        this.companyID = this.markets[0].companyID;
        this.usp_getAllFunds();
      }else{
        this.loading =false;
      }
    });
  }

  usp_getAllFunds() {
    this.loading =true;
    this.officialIndicsService.getAllFundsByCompanyID(this.companyID).subscribe(res => {
      this.funds = res;
      if(this.funds.length > 0){
        this.fundID = this.funds[0].mFundID;
        this.usp_getAllFundPrices();
      }else{
        this.loading =false;
      }
    });
  }

  usp_getAllFundPrices() {
    this.loading =true;
    this.officialIndicsService.getAllFundPricesByMFundID(this.fundID).subscribe(res => {
      this.fundPrices = res;
      if(this.fundPrices.length > 0) this.handleFundPrice(this.fundPrices[0])
        else
      this.loading =false;
    });
  }

  handleFundPrice(fundPrice: MFundPrices) {
    this.fundPrice = fundPrice;
    if(this.fundPrice.priceDate)
      this.fundPrice.priceDate = moment(this.fundPrice.priceDate).format("MM/DD/YYYY")
    this.loading = false;
  }

  addNewFundPrice() {
    this.fundPrice = {
      mFundPriceID: 0,
      mFundID: 0,
      closingPrice: 0,
      tradingVolume: 0,
      lastClosePrice: 0,
      isActive: false
    };
  }

  insertMFundPrice() {
    debugger;
    this.loading = true;
    
    if(!this.fundID || this.fundID == 0){
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: 'please select fund', icon: 'error', });
      this.loading = false;
    }else if(!this.fundPrice.priceDate){
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: 'please select Date', icon: 'error', });
      this.loading = false;
    }
    else{
      this.fundPrice.mFundID = this.fundID;
      this.fundPrice.priceDate = moment(this.fundPrice.priceDate).format();
      this.fundPriceService.insertMFundPricesByModel(this.fundPrice).subscribe(res => {
        debugger;
        if (this.fundPrice.mFundPriceID > 0) {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.fundPrice.closingPrice + ' updated successfully', icon: 'success', });
          this.addNewFundPrice();
        }
        else {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.fundPrice.closingPrice + ' created successfully', icon: 'success', });
          this.addNewFundPrice();
        }
  
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

}
