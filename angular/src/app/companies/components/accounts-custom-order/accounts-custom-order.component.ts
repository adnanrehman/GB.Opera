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
import { CommonModule, NgFor } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { CompanyFactOrderService } from '@proxy/company-fact-orders';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Company_AccountsCustomOrder } from 'src/app/services/permissions';

@Component({
  selector: 'app-accounts-custom-order',
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
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule
  ],
  templateUrl: './accounts-custom-order.component.html',
  styleUrl: './accounts-custom-order.component.scss'
})
export class AccountsCustomOrderComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  companyTicker:string;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companyFactOrders = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
flgload:boolean=true
  constructor(
    private commonService: CommonService,
    private companyFactOrderService: CompanyFactOrderService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
   
  }

  ngOnInit() {
    this.flgload=false
    if (this.permissionService.getGrantedPolicy(Company_AccountsCustomOrder + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_AccountsCustomOrder + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_AccountsCustomOrder + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    // this.stockMarketID = 0;
    
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
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) {
        if(!this.sectorID)
        this.sectorID = this.companyMarketSectors[0].sectorID; 
      this.getSectorCompaniesBySectorIDAndStockMarketID();
      }
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
        if (this.companiesTickers.length > 0){
          if(!this.companyID)
          this.companyID = this.companiesTickers[0].companyID;
          this.companyTicker = this.companiesTickers[0].ticker;
          this.getCompaniesFactOrdersByCompanyID();
        } 
        else this.loading = false;
      });
  }

  // getCompaniesFactOrdersByCompanyID() {
     
  //   if (this.companyID == undefined && this.companiesTickers.length > 0)
  //     this.companyID = this.companiesTickers[0].companyID;
  //   this.companyTicker = this.companiesTickers.find(f => f.companyID == this.companyID).ticker;
  //   this.companyFactOrderService
  //     .getCompaniesFactOrdersByCompanyID(this.companyID)
  //     .subscribe(res => {
  //       debugger;
  //       this.companyFactOrders = res;
  //       this.loading = false;
  //     });
  // }

  

  getCompaniesFactOrdersByCompanyID() {
    // Trigger SweetAlert before making the API call with Yes/No options
    Swal.fire({
      title: 'Loading company fact orders...',
      text: 'Do you want to continue fetching the data?',
      icon: 'info',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false // Prevent closing until the request is completed
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes', proceed with fetching the data
        console.log('User confirmed the action. Fetching company fact orders...');
        
        // Now show a loading message while making the API call
        Swal.fire({
          title: 'Loading...',
          text: 'Please wait while we fetch the data.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false
        });
  
        this.companyFactOrderService
          .getCompaniesFactOrdersByCompanyID(this.companyID)
          .subscribe(
            res => {
              // Successfully fetched data, close the loading alert
              Swal.close();
              this.companyFactOrders = res;
              this.loading = false;
              console.log('Data fetched successfully', res);
            },
            error => {
              // Handle error while fetching data
              Swal.close(); // Close the loading alert
              Swal.fire('Error', 'There was an issue fetching the company fact orders.', 'error');
              console.error('Error fetching data', error);
            }
          );
      } else if (result.isDismissed) {
        // User clicked 'No' or dismissed the alert, handle cancellation
        console.log('User canceled the action.');
        Swal.fire('Action canceled', 'You chose not to fetch the company fact orders.', 'info');
      }
    });
  }
  
  
  
  // Function to fetch company fact orders
 
  
  // Function to fetch company fact orders
 
  

// Function to fetch company fact orders
// fetchCompanyFactOrders() {
//   this.companyFactOrderService
//     .getCompaniesFactOrdersByCompanyID(this.companyID)
//     .subscribe(res => {
//       this.companyFactOrders = res;
//       this.loading = false;
//     });
// }
  save() {
    debugger;
    this.loading = true;
    this.companyFactOrderService.createOrUpdateCompanyFactOrderByList(this.companyFactOrders).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error While Saveing", err);
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          title: 'Error!',
          text: "Error While Saveing",
          icon: 'error'
        });

      }
    });
  }
}
