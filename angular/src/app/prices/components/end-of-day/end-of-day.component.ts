import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EndofDayService } from '@proxy/end-of-day/endof-day.service';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_EndOfDay } from 'src/app/services/permissions';
import { CommonModule } from '@angular/common';
import { ImportService } from 'src/app/services/import/import.service';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { DialogModule } from 'primeng/dialog';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { fakeAsync } from '@angular/core/testing';
import { CommonService } from '@proxy/commons';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    FormsModule,
    DialogModule,
    ThemeSharedModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    TabViewModule,
    RadioButtonModule,
    CommonModule,
  ],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss',
})
export class EndOfDayComponent {
  filteredCountries: any[];
  ingredient: any;
  importFile: any;
  loading: boolean = false;
  showImportPriceModal: boolean = false;
  selectedItem: any;
  suggestions: any[] = [];
  markets = [];
  fundPricesImportDto: any[] = [];
  EodPrices: any[] = [];
  selectedMarketID: number | null = null;
  // selectedDate: string | null = null;
  selectedDate = moment(new Date()).format("MM/DD/YYYY")
  permission: {
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  constructor(
    private endofDayService: EndofDayService,
    public importService: ImportService,
    private commonService: CommonService,
    private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false,
    };
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_EndOfDay + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_EndOfDay + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_EndOfDay + '.Delete')) {
      this.permission.delete = true;
    }
    this.filteredCountries = [
      { name: 'RIBL', code: 'rible' },
      { name: 'Suadia Arabia', code: 'KSA' },
      { name: 'Dubai', code: 'UAE' },
      { name: 'IRAN', code: 'IR' },
    ];
    this.getstockmarkets();
  }
  getstockmarkets() {
    this.endofDayService.getAllGCCSector().subscribe(res => {
      this.markets = res;
      if (this.markets.length > 0){
        this.selectedMarketID = this.markets[0].stockMarketID;
        this.getEodPrices();
      } 
    });
  }

  search(event: AutoCompleteCompleteEvent) {
   // this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
   //   this.loading = false;
    });
  }

  onSelect(event: any) {
    this.loading = true;
    debugger;
    this.selectedMarketID = event.value.stockMarketID;
    this.getEodPrices();
    this.selectedItem = null;
    this.loading = false;
  }
  // onDropdownChange(event: any) {
  //   this.selectedMarketID = event.value;
  //   console.log('Selected Market ID:', this.selectedMarketID);
  // }


  // onDateChange(event: any) {
  //   console.log('Event:', event);

  //   const date = event; 

  //   if (date instanceof Date) {
  //     // Ensure date is a Date object
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const day = String(date.getDate()).padStart(2, '0');

  //     this.selectedDate = `${year}-${month}-${day}`;
  //     this.getEodPrices();
  //     console.log('Selected Date:', this.selectedDate);
  //   } else {
  //     console.error('Invalid date');
  //   }
  // }

  getEodPrices() {
    this.loading = true;
    this.selectedDate = moment(this.selectedDate).format("YYYY-MM-DD");
    if (this.selectedDate && this.selectedMarketID) {
      this.endofDayService
        .eodPricesByPriceDateAndStockMarketID(this.selectedDate, this.selectedMarketID)
        .subscribe({
          next: res => {
            this.loading = false;
            this.selectedDate = moment(this.selectedDate).format("MM/DD/YYYY");
            // Check if res is an array and map items with boolean conversion
            if (Array.isArray(res)) {
              this.EodPrices = res.map(item => ({
                ...item,
                isActive: !!item.isActive, // Convert to boolean
              }));
              console.log('EodPrices after mapping:', this.EodPrices); // Debugging output
            } else {
              console.error('Unexpected data format:', res);
            }
          },
          error: err => {
            console.error('Error fetching EOD prices:', err); // Handle errors
            this.loading = false;
          },
        });
    } else {
      console.error('Selected date or market ID is not defined.');
      this.loading = false;
    }
  }

  showImportModel() {
    this.showImportPriceModal = true;
  }
  // onFileChange(event: any) {
  //   this.importFile = event.target.files[0];
  //   console.log(event);
  // }

  ImportPrices() {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.importFile);
    this.importService.importPrices(formData).subscribe(
      res => {
        debugger;
        if (res == '1') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: ' file imported successfully',
            icon: 'success',
          });
          this.showImportPriceModal = false;
          this.importFile = null;
          this.getEodPrices();
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Error!',
            text: res,
            icon: 'error',
          });
        }

        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
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
        if(row[0] != undefined && row[3]?.trim() != undefined && row[4]?.trim() != undefined){
          const temp = row[0].toString();
          const id = Number(row[1]);  
          const company = row[2]?.trim();  
          const ticker = row[3]?.trim();  
          const stockMarket = row[4]?.trim();
          const priceDate = row[5];
          let pricedate: Date;
  
          if (typeof priceDate === 'number') {
            const dateCode = XLSX.SSF.parse_date_code(priceDate);
            pricedate = new Date(Date.UTC(dateCode.y, dateCode.m - 1, dateCode.d));
  
            const year = pricedate.getFullYear();
            const month = String(pricedate.getMonth() + 1).padStart(2, '0');
            const day = String(pricedate.getDate()).padStart(2, '0');
  
            const dates = `${year}-${month}-${day}`;
          } else if (typeof priceDate === 'string') {
  
            pricedate = new Date(priceDate);
          } else {
            pricedate = null;
          }
           
          const openingPrice = parseFloat(row[6]);  
          const highestPrice = parseFloat(row[7]);  
          const lowestPrice = parseFloat(row[8]);  
          const closingPrice = parseFloat(row[9]);  
          const tradingVolume = Number(row[10]);  
          const trades = Number(row[11]);  
          const tradingValue = parseFloat(row[12]);             
        var date1=moment(pricedate).format()
          return {
            temp,
            id,
            company,
            ticker,
            stockMarket,
            pricedate,
            openingPrice,
            highestPrice,
            lowestPrice,
            closingPrice,
            tradingVolume,
            trades,
            tradingValue,
          };
        }

      });

      this.importData(formattedData);
    };

    reader.readAsBinaryString(file);

  }

  importData(data: any) {

    this.loading = true;

    if (!Array.isArray(data)) {
      console.error('Data passed to importCurrencyData is not an array:', data);
      return;
    }

    if (!Array.isArray(this.fundPricesImportDto)) {
      console.error('this.Currencies is not an array. Initializing as an empty array.');
      this.fundPricesImportDto = [];
    }

    this.fundPricesImportDto = [...this.fundPricesImportDto, ...data];
    this.loading = false;
  }

  InsertPrices() {
    // Check if the currencies list is empty or not defined
    if (!this.fundPricesImportDto || this.fundPricesImportDto.length === 0) {
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
debugger;
    this.endofDayService.importPricesByList(this.fundPricesImportDto).subscribe(
      res => {
        if(res == "1"){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: 'Saved successfully',
            icon: 'success',
          });
        }else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Error!',
            text: res,
            icon: 'error',
          });
        }
        this.getEodPrices();
        this.showImportPriceModal=false;
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
          text: 'Failed to save data',
          icon: 'error',
        });
      },
      () => {
        this.loading = false; // Hide loading spinner when the request completes
      }
    );
  }
}
