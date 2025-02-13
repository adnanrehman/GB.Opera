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
  rate: number = 0;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  newReviewFinancials: NewReviewFinancialDto[] = [];
  periodTypes: any[] = [];
  qPeriods: any[] = [];
  users: any[] = [];
  usersList: any[] = [];
  statuses: any[] = [];
  years:string =''
  companyTicker:string;
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
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
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
   // this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
   //   this.loading = false;
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
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) {
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
    this.loading = true;
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
    this.loading = true;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companyTicker = this.companiesTickers.find(f => f.companyID == this.companyID).ticker;
   
  
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
    if (this.newReviewFinancial.asOfDate)
      this.newReviewFinancial.asOfDate = moment(this.newReviewFinancial.asOfDate).format("MM/DD/YYYY")
    this.loading = false;
  }

  updateAdminFinancialsByInput() {
    this.loading = true;

    // If 'years' is empty, set it to the 'newReviewFinancial.year' value
    if (this.years === "") {
        this.years = this.newReviewFinancial.year.toString();
    }

    // Directly proceed with the update method without performing the check
    this.newReviewFinancial.asOfDate = moment(this.newReviewFinancial.asOfDate).format();

    // Call the update method
    this.financialsAdminService.updateAdminFinancialsByInput(this.newReviewFinancial).subscribe(
        (updateRes) => {
            // Handle the successful update response
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                title: 'Success!',
                text: `${this.newReviewFinancial.qPeriod} updated successfully`,
                icon: 'success',
            });

            // Optionally handle the updated financial review if needed (e.g., update UI)
            this.handleNewReviewFinancial(this.newReviewFinancial);
            this.loading = false;
        },
        (updateError) => {
            // Handle error from the update API call
            console.error('Error during update:', updateError);
            this.loading = false;
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                title: 'Error!',
                text: 'There was an error updating the financial record.',
                icon: 'error',
            });
        },
        () => {
            // Cleanup if necessary (this will be called in both success and error cases of the update)
            this.loading = false;
        }
    );
}



  updateFinancialRateChangesByFinancialIdAndRate() {
    debugger;
    this.loading = true;
    this.financialsAdminService.updateFinancialRateChangesByFinancialIdAndRate(this.newReviewFinancial.financialsID, this.rate).subscribe(res => {
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

  deleteFinancial(financialsID: number): void {
    // Show confirmation dialog first
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the financial record with ID: ${financialsID}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if the user confirms
        this.loading = true;

        this.financialsAdminService.deleteFinancialByFinancialId(financialsID).subscribe(
          (response) => {
            // Assuming the response is successful
            this.loading = false;

            // Show success message
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: `${financialsID} deleted successfully`,
              icon: 'success',
            });

            // Handle after success
            this.getNewFinancialReviewsByCompanyID();
          },
          (error) => {
            this.loading = false;
            // Show error message if the deletion fails
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Error!',
              text: 'There was an error deleting the financial record.',
              icon: 'error',
            });
          }
        );
      } else {
        // If the user cancels the deletion, you can show a cancellation message (optional)
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Cancelled',
          text: 'The financial record was not deleted.',
          icon: 'info',
        });
      }
    });
  }


  onQPeriodChange(event: any) {
    //  (onChange)="onQPeriodChange($event)"
    // Log the selected Q Period to the console (optional)
    console.log('Selected Q Period:', event.value);

    // Implement logic for the "Yearly" checkbox based on selected Q Period
    if (event.value === 4) {
      // Enable "Yearly" checkbox when Q4 is selected
      
      this.newReviewFinancial.isYearly = true;
    } else {
      // Disable "Yearly" checkbox when any other period is selected
     
      this.newReviewFinancial.isYearly = false;

    }
  }
  onYearChange(event: any) {
   
    this.years= event;// Logs the selected year as a string (e.g., "24")
   
  }
}
