import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { CountryFactOrderDto, CountryFactOrderService } from '@proxy/country-fact-orders';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-accounts-facts-order',
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
    TabViewModule,TreeModule
  ],
  templateUrl: './country-accounts-facts-order.component.html',
  styleUrl: './country-accounts-facts-order.component.scss'
})
export class CountryAccountsFactsOrderComponent {
  loading: boolean = false;
  countryID: number;
  countryName: string;
  countries = [];
  countryFactOrders: CountryFactOrderDto[];

  constructor(
    private commonService: CommonService,
    private countryFactOrderService: CountryFactOrderService
  ) {}

  ngOnInit() {
    this.getCountriesForIndicators();
  }

  getCountriesForIndicators() {
    this.loading =true;
    this.commonService.getCountriesForIndicators().subscribe(res => {
      this.countries = res;
      if(this.countries.length > 0) this.getCountryFactOrdersByCountryID();
      this.loading =false;
    });
  }

  getCountryFactOrdersByCountryID() {
    debugger;
    this.loading = true;
    if (this.countryID == undefined && this.countries.length > 0)
      this.countryID = this.countries[0].countryID;
    this.countryFactOrderService
      .getCountryFactOrdersByCountryID(this.countryID)
      .subscribe(res => {
        debugger;
        this.countryFactOrders = res;
        this.loading = false;
      });
  }

  save() {
    debugger;
    this.loading =true;
    this.countryFactOrderService.createOrUpdateCountryFactOrderByList(this.countryFactOrders).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);    
        this.loading =false;  
      },
      error: (err) => {
        console.error("Error While Saveing", err);
        this.loading =false;  
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
