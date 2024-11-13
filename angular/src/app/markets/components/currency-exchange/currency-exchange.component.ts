import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyExchangeService } from '@proxy/currencies-exchange';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { CompanyAndMarket_CurrencyExchange } from 'src/app/services/permissions';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-currency-exchange',
  standalone: true,
  imports: [TableModule, TreeModule, CalendarModule, AutoCompleteModule,
    FormsModule, DropdownModule, ImageModule, FileUploadModule, TabViewModule, ThemeSharedModule, CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss'
})
export class CurrencyExchangeComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  loading: boolean = false;
  Currencies: any[];
  selectedDate: string | null = null;
  currentDate: Date = new Date();  // Initialize currentDate as Date object
  selectDate: Date = new Date();
  constructor(private permissionService: PermissionService, private currencyExchangeService: CurrencyExchangeService) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }

  }
  ngOnInit() {
      
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Delete')) {
      this.permission.delete = true;
    }
       this.currentDate = new Date();
    this.selectDate = new Date();
   
    let formattedDate = this.selectDate.toLocaleDateString('en-CA'); // You can also use 'toISOString().split('T')[0]' here.
  
     
  
    this.getcurency(formattedDate);
  }
  
  onDateChange(event: any) {

    console.log('Event:', event);  // Log event to check its structure

    const date = event; // Check if event.value is a Date object

    if (date instanceof Date) { // Ensure date is a Date object
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      this.selectedDate = `${year}-${month}-${day}`;
      this.getcurency(this.selectedDate);

    } else {
      console.error('Invalid date');
    }
  }


  getcurency(date: string) {

    this.currencyExchangeService.getCurrencyByDate(date).subscribe(res => {
      this.Currencies = res;


    });

  }
  onFileChange(event: any) {

    if (event.files.length === 0) {
      alert('No file selected.');
      return;
    }

    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];


      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
 


      const formattedData = jsonData.slice(1).map((row: any) => {
        const currencyFrom = row[0]?.trim(); // 'From' column
        const currencyTo = row[1]?.trim();   // 'To' column
        const exchange = parseFloat(row[2]);  // Assuming 'Exchange' is the third column
        const dateValue = row[3];              // 'Date' column

        let date: Date;

        if (typeof dateValue === 'number') {
          const dateCode = XLSX.SSF.parse_date_code(dateValue);
          date = new Date(Date.UTC(dateCode.y, dateCode.m - 1, dateCode.d));

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');

          const dates = `${year}-${month}-${day}`;
        } else if (typeof dateValue === 'string') {

          date = new Date(dateValue);
        } else {
          date = null;
        }

        return {
          CurrencyExchangeID: 0,
          currencyFrom,
          currencyTo,
          exchange,
          date,
        };
      });

      this.importCurrencyData(formattedData);
    };

    reader.readAsBinaryString(file);

  }

  importCurrencyData(data: any) {

    this.loading = true;

    if (!Array.isArray(data)) {
      console.error('Data passed to importCurrencyData is not an array:', data);
      return;
    }

    if (!Array.isArray(this.Currencies)) {
      console.error('this.Currencies is not an array. Initializing as an empty array.');
      this.Currencies = [];
    }

    this.Currencies = [...this.Currencies, ...data];
    this.loading = false;
  }

  insertCurrencyGroup() {
    // Check if the currencies list is empty or not defined
    if (!this.Currencies || this.Currencies.length === 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'No currencies to save.',
        icon: 'error',
      });
      return;  // Prevent further execution
    }

    this.loading = true; // Show loading spinner

    this.currencyExchangeService.usp_InsertCurrencyExchangeByList(this.Currencies).subscribe(
      res => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Success!',
          text: 'Saved successfully',
          icon: 'success',
        });

        // If you need to perform further actions, uncomment and use them:
        // this.addNewCountryGroup();
      },
      error => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Error!',
          text: 'Failed to save currency data',
          icon: 'error',
        });
      },
      () => {
        this.loading = false; // Hide loading spinner when the request completes
      }
    );
  }


  reset() {

    this.Currencies = [];

    this.loading = false;

    Swal.close();
    this.currentDate = new Date();
    this.selectDate = new Date();
    let formattedDate = this.selectDate.toLocaleDateString('en-CA'); // You can also use 'toISOString().split('T')[0]' here.
    this.getcurency(formattedDate);
  }

}
