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
import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { Financial_Upload } from 'src/app/services/permissions';
import { CommonService } from '@proxy/commons/common.service';
import { ListboxModule } from 'primeng/listbox';
import { UploadService } from '@proxy/uploads/upload.service';
import { UploadFinancials, UploadwithHasDtos } from '@proxy/uploads/models';
import { NewsDto } from '@proxy/news';
import { ThemeSharedModule, UserMenu } from '@abp/ng.theme.shared';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-upload',
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
    CheckboxModule,
    InputTextModule, ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  stockMarkets = [];
  selectedItem: any;
  suggestions: any[] = [];
  filteredCountries: any[];
  companyMarketSectors = [];
  newsEngs: NewsDto[] = [];
  stockMarketID: number;
  sectorID: number;
  companiesTickers = [];
  loading = false;
  quarter = [];
  period = [];
  entryusers = [];
  reentryusers = [];
  NewType=[];
  userId = "";
  uploadFinancials = [];
  uploadFinancial: UploadFinancials = {
    financialsID: 0,
    companyID: 0,
    periodTypeID: 0,
    financialEntryTypeID: 0,
    isYearly: false,
    qPeriodId: 0,
    newReviewFinancialID: 0
  }

  data: UploadwithHasDtos | null = null;

   
 
  companyID: number;
  newsEng: NewsDto = {
    newsID: 0,
    isApproved:false,
    isHotNews: false
  }
  
  constructor( 
    private permissionService: PermissionService,
    private commonService: CommonService,
    private config: ConfigStateService,
    private uploadService : UploadService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }

 } 
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.getEntryusers();
    const currentUser = this.config.getOne("currentUser");
    this.userId = currentUser.id;
    
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
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID;
    this.getStockMarkets();
    this.selectedItem = null;
    this.loading = false;
  }


getEntryusers()
{
  this.uploadService._getEntryReEntryUsers().subscribe(res=>
  {
    //   const userJson = JSON.stringify(res); 
     //   alert(userJson);
    this.entryusers=res.filter(user => user.userType==='Entry Operator');
    this.reentryusers=res.filter(user => user.userType==='Re Entry Operator');
   

  });
  
}
 
  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if(this.stockMarkets.length > 0){
        if(!this.stockMarketID)
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getStockMarketSectorsByStockMarketID();
      }
    });
  }

  getUploadData() {
    this.uploadService.uploadwithHasDtosByMarketIDAndSectorID(this.stockMarketID, this.sectorID)
      .subscribe(
        (res: UploadwithHasDtos) => {
          this.data = res; 
  
    this.quarter=this.data.qPeriodType
    this.period=this.data.period
    this.NewType=this.data.financialEntryType;
        },
        (error) => {
          console.error('Error uploading data:', error); // Handle errors gracefully
        }
      );
  }

  getStockMarketSectorsByStockMarketID() {
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getSectorCompaniesBySectorIDAndStockMarketID();
      else this.loading = false;
    });
  }  
  
  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    this.loading = true;
    if (this.companyMarketSectors.length > 0){
      if(!this.sectorID)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    }
      
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if(this.companiesTickers.length > 0) this.getFinancialsBycompanyIdByCompanyID();
        this.loading = false;
      });
      this.getUploadData();
  }

  getFinancialsBycompanyIdByCompanyID() {
    this.loading = true;
    if (this.companiesTickers.length > 0){
      if(!this.companyID)
      this.companyID = this.companiesTickers[0].companyID;
    }
      
    this.uploadService
      .getFinancialsBycompanyIdByCompanyID(this.companyID)
      .subscribe(res => {
        this.uploadFinancials = res;
        this.loading = false;
      });
  }

  createUploadFinancial() {
   
    this.loading = true;
    this.uploadFinancial.companyID = this.companyID;
    this.uploadFinancial.userID = this.userId;
    this.uploadFinancial.asOfDate = this.uploadFinancial.asOfDate;
    
    // Call the service to check if the period already exists for the given year and company
    this.uploadService.checkfinancialyearByYearAndQPeriodIDAndCompanyID(this.uploadFinancial.year.toString(),
      this.uploadFinancial.qPeriodId,
      this.uploadFinancial.companyID
    ).subscribe(
      (res) => {
        if (res === "This period is already added in this year") {
          // If the period is already added, show an alert and stop further execution
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Error!',
            text: 'This period is already added in this year.',
            icon: 'error',
          });
          this.loading = false;
        } else {
          // Proceed with saving the data if the period is not already added
          this.uploadService.createUploadFinancialByInput(this.uploadFinancial).subscribe(
            (res) => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                title: 'Success!',
                text: this.uploadFinancial.remarks + ' saved successfully',
                icon: 'success',
              });
              this.getFinancialsBycompanyIdByCompanyID();
              this.uploadFinancial = {
                financialsID: 0,
                companyID: 0,
                newReviewFinancialID: 0,
                periodTypeID: 0,
                financialEntryTypeID: 0,
                isYearly: false,
                qPeriodId: 0
              };
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        // Handle error if the check service call fails
        this.loading = false;
      }
    );
  }
  
  // createUploadFinancial() {
  //   debugger;
  //   this.loading = true;
  //   this.uploadFinancial.companyID = this.companyID;
  //   this.uploadFinancial.userID = this.userId;
  //   this.uploadFinancial.asOfDate = moment(this.uploadFinancial.asOfDate).format();
  //   this.uploadService.checkfinancialyearByYearAndQPeriodIDAndCompanyID(this.uploadFinancial.year.toString(),this.uploadFinancial.qPeriodId,this.uploadFinancial.companyID)
  //   this.uploadService.createUploadFinancialByInput(this.uploadFinancial).subscribe(res => {
  //     debugger;
  //     Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.uploadFinancial.remarks + ' saved successfully', icon: 'success', });
  //     this.getFinancialsBycompanyIdByCompanyID();
  //     this.uploadFinancial = {
  //       financialsID: 0,
  //       companyID: 0,
  //       newReviewFinancialID: 0,
  //       periodTypeID: 0,
  //       financialEntryTypeID: 0,
  //       isYearly: false,
  //       qPeriodId: 0
  //     };
  //     this.loading = false;
  //   },
  //     error => {
  //       this.loading = false;
  //     },
  //     () => {
  //       this.loading = false;
  //     });
  // }
  onQPeriodChange(event: any) {
    //  (onChange)="onQPeriodChange($event)"
    // Log the selected Q Period to the console (optional)
    console.log('Selected Q Period:', event.value);

    // Implement logic for the "Yearly" checkbox based on selected Q Period
    if (event.value === 4) {
      // Enable "Yearly" checkbox when Q4 is selected
      
      this.uploadFinancial.isYearly= true;
    } else {
      // Disable "Yearly" checkbox when any other period is selected
     
      this.uploadFinancial.isYearly = false;

    }
  }

}
