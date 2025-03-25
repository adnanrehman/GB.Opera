import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { Financial_Entry } from 'src/app/services/permissions';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { AsOfDateDto, AsofDatesFinancialDto, AsofDatesFinancialInputDto, CompanyAccountsInputDto, EntryService, FinancialsDetailDto, FinEntryInReviewDto, StatusFinancialsDto } from '@proxy/entry';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import Swal from 'sweetalert2';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ListboxModule,CommonModule,ThemeSharedModule,
    ImageModule,FileUploadModule,TabViewModule,CheckboxModule,RadioButtonModule,CommonModule,    InputNumberModule,TooltipModule,
    InputTextModule, ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})
export class EntryComponent {

  statusFinancials: any[];
  financialsDetails: FinancialsDetailDto[]= [];
  reviewFinancialsDetails: FinancialsDetailDto[]= [];
  finEntryInReviews: FinEntryInReviewDto[]=[];
  asOfDates: AsOfDateDto[]= [];
  statusFinancialsFilterData: any[];
  financialEntryType:any;
  loading = false;
  loadingR = false;
  loadingU = false;
  statusFinanial:StatusFinancialsDto ={
    financialsID: 0,
    companyID: 0,
    newReviewFinancialID: 0,
    financialEntryTypeID: 0
  };
  asOfDate:AsOfDateDto ={
    financialsID: 0,
    companyID: 0,
    hasChanges: false
  }
  userId = "";
  testId:number
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService,
    private config: ConfigStateService,
    private entryService:EntryService
  ){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_Entry + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Entry + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Entry + '.Delete')) {
      this.permission.delete = true;
    }
    const currentUser = this.config.getOne("currentUser");
    this.userId = currentUser.id;
    this.getStatusFinancialsByUserId();
  }

  getStatusFinancialsByUserId() {
    this.loading =true;
    this.statusFinancials = [];
    this.statusFinancialsFilterData = [];
    this.financialsDetails = [];
    this.finEntryInReviews = [];
    this.asOfDate = {
      financialsID: 0,
      companyID: 0,
      hasChanges: false
    }
    this.asOfDates = []
    this.reviewFinancialsDetails = [];
    this.statusFinanial = {
      financialsID: 0,
      companyID: 0,
      newReviewFinancialID: 0,
      financialEntryTypeID: 0
    };
    
    this.entryService.getStatusFinancialsByUserId(this.userId).subscribe(res => {
      this.statusFinancials = res;
      this.statusFinancialsFilterData = res;
      this.loading =false;
    });
  }

  filterData(){
    if(this.financialEntryType == "0")
      this.statusFinancials = this.statusFinancialsFilterData;
    else 
    this.statusFinancials = this.statusFinancialsFilterData.filter(f => f.financialEntryTypeID == Number(this.financialEntryType))
  }

  getCompanyAccounts(){
    this.loadingU = true;
    var obj: CompanyAccountsInputDto= {
      financialsID: this.statusFinanial.financialsID,
      newReviewFinancialID: this.statusFinanial.newReviewFinancialID,
      companyID: this.statusFinanial.companyID,
      isNew: true
    }
    this.entryService.getCompanyAccountsByInput(obj).subscribe(res => {
      debugger;
      this.financialsDetails = res.financialsDetails;
      this.getValueWorkingCapitol(this.financialsDetails);
      if(this.asOfDate.financialsID == 0)
        this.asOfDates = res.asOfDates;
      this.loadingU = false; 
      if(this.asOfDates.length > 0 && this.asOfDate.financialsID == 0) this.getAsofDatesFinancials(this.asOfDates[0]);
      else this.loadingU = false;        
    });
  }

  iniatalizaAsOfDate(){
    this.financialsDetails= [];
    this.asOfDates =[];
    this.reviewFinancialsDetails = [];
    this.finEntryInReviews = [];
    this.asOfDate ={
      financialsID: 0,
      companyID: 0,
      hasChanges: false
    }
  }

  getAsofDatesFinancials(asOfDate:AsOfDateDto){
    this.loadingR = true;
    this.reviewFinancialsDetails = [];
    this.finEntryInReviews = [];
    this.asOfDate = asOfDate;
    var obj: AsofDatesFinancialInputDto= {
      financialsID: asOfDate.financialsID,
      companyID: asOfDate.companyID,
      isNew: false
    }
    this.entryService.getAsofDatesFinancialsByInput(obj).subscribe(res => {
      debugger;
      this.reviewFinancialsDetails = res.financialsDetails;
      this.getValueWorkingCapitol(this.reviewFinancialsDetails);
      this.finEntryInReviews = res.finEntryInReviews
      this.loadingR = false;
    });
  }

  calculateFinancialsCapitol(item:any,list:any[]){
    if(item.gbFact == "Current Assets" || item.gbFact == "Current Liabilities")
      this.getValueWorkingCapitol(list);
  }

  getValueWorkingCapitol(list: any[]){
    debugger;
    var workingCapitol = list.find(f => f.gbFact == "Working Capital");
    if(workingCapitol != null){
      var currentAssets = list.find(f => f.gbFact == "Current Assets");
      var currentLiabilities = list.find(f => f.gbFact == "Current Liabilities");
      if(currentAssets != null && currentLiabilities != null){
        workingCapitol.value = currentAssets.value - currentLiabilities.value;
      }
    }
  }



  SavePending() {
    debugger;
    this.loadingU = true;
    this.entryService.insertUpdateFinancialValuesByList(this.financialsDetails).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Saved successfully', icon: 'success', });
      this.loadingU = false;
      // this.getCompanyAccounts();
    },
      error => {
        this.loadingU = false;
      },
      () => {
        // this.loadingU = false;
      });
  }

  forward() {
    debugger;
    this.loading = true;
    this.entryService.insertUpdateFinancialCommentsStatusByListAndUserID(this.financialsDetails,this.userId).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Saved successfully', icon: 'success', });
      this.getCompanyAccounts();

      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        // this.loading = false;
      });
  }

  ComitChanges() {
    debugger;
    this.loadingR = true;
    var obj: AsofDatesFinancialDto= {
      financialsDetails: this.reviewFinancialsDetails,
      finEntryInReviews: this.financialEntryType
    }
    this.entryService.insertUpdateComitChangesByDtoAndUserID(obj,this.userId).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Saved successfully', icon: 'success', });
      // this.getAsofDatesFinancials(this.asOfDate);

      this.loadingR = false;
    },
      error => {
        this.loadingR = false;
      },
      () => {
        // this.loadingR = false;
      });
  }



}

