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

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ListboxModule,CommonModule,ThemeSharedModule,
    ImageModule,FileUploadModule,TabViewModule,CheckboxModule,RadioButtonModule,CommonModule,    InputNumberModule,
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
    this.entryService.getStatusFinancialsByUserId(this.userId).subscribe(res => {
      this.statusFinancials = res;
      this.statusFinancialsFilterData = res;
    });
  }

  filterData(){
    if(this.financialEntryType == "0")
      this.statusFinancials = this.statusFinancialsFilterData;
    else 
    this.statusFinancials = this.statusFinancialsFilterData.filter(f => f.financialEntryTypeID == Number(this.financialEntryType))
  }

  getCompanyAccounts(){
    this.loading = true;
    var obj: CompanyAccountsInputDto= {
      financialsID: this.statusFinanial.financialsID,
      newReviewFinancialID: this.statusFinanial.newReviewFinancialID,
      companyID: this.statusFinanial.companyID,
      isNew: true
    }
    this.entryService.getCompanyAccountsByInput(obj).subscribe(res => {
      debugger;
      this.financialsDetails = res.financialsDetails;
      this.asOfDates = res.asOfDates;
      if(this.asOfDates.length > 0) this.getAsofDatesFinancials(this.asOfDates[0]);
      else this.loading = false;        
    });
  }

  getAsofDatesFinancials(asOfDate:AsOfDateDto){
    this.loading = true;
    this.asOfDate = asOfDate;
    var obj: AsofDatesFinancialInputDto= {
      financialsID: asOfDate.financialsID,
      companyID: asOfDate.companyID,
      isNew: false
    }
    this.entryService.getAsofDatesFinancialsByInput(obj).subscribe(res => {
      debugger;
      this.reviewFinancialsDetails = res.financialsDetails;
      this.finEntryInReviews = res.finEntryInReviews
      this.loading = false;
    });
  }

  SavePending() {
    debugger;
    this.loading = true;
    this.entryService.insertUpdateFinancialValuesByList(this.financialsDetails).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Saved successfully', icon: 'success', });
      this.getCompanyAccounts();

      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
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
        this.loading = false;
      });
  }

  ComitChanges() {
    debugger;
    this.loading = true;
    var obj: AsofDatesFinancialDto= {
      financialsDetails: this.reviewFinancialsDetails,
      finEntryInReviews: this.financialEntryType
    }
    this.entryService.insertUpdateComitChangesByDtoAndUserID(obj,this.userId).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Saved successfully', icon: 'success', });
      this.getAsofDatesFinancials(this.asOfDate);

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

