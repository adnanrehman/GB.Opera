import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EndofDayService } from '@proxy/end-of-day';
import { OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_Official } from 'src/app/services/permissions';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ImportService } from 'src/app/services/import/import.service';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { DialogModule } from 'primeng/dialog';
import { CommonService } from '@proxy/commons';
import * as moment from 'moment';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-official',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,  DialogModule,  ThemeSharedModule,
    DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CommonModule ],
  templateUrl: './official.component.html',
  styleUrl: './official.component.scss'
})
export class OfficialComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  filteredCountries: any[];
  selectedItem: any;
  suggestions: any[] = [];
  markets = [];
  importofficail: any[];
  selectedMarketID: number | null = null;
  selectedDate = moment(new Date()).format("MM/DD/YYYY")
  ingredient: any;
  importFile:any;
  loading: boolean = false;
  showImportPriceModal: boolean = false;
  OfficailIndics: any[] = [];
  data: any[] = [
    { sm: "TASI", tick: "", op: "8.0200", hp: "7.9000", lp: "8.0000", cp: "8.0200", tv: "80933", tv2: "641389.7800", tr: "138", lcp: "8.0200", },

  ];
  constructor(private endofDayService: EndofDayService,
    private commonService: CommonService,
    public importService: ImportService,
    private officialIndicsService : OfficialIndicsService , private permissionService: PermissionService) { 
      this.permission = {
        create: false,
        edit : false,
        delete  :false
      }
    }

  getstockmarkets() {
    this.endofDayService.getAllGCCSector().subscribe(res => {
      this.markets = res;
      if (this.markets.length > 0){
        this.selectedMarketID = this.markets[0].stockMarketID;
        this.getEPfficail();
      } 
    });
  }

  search(event: AutoCompleteCompleteEvent) {
  //  this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
    //  this.loading = false;
    });
  }

  onSelect(event: any) {
    this.loading = true;
    debugger;
    this.selectedMarketID = event.value.stockMarketID;
    this.getEPfficail();
    this.selectedItem = null;
    this.loading = false;
  }

  // onDropdownChange(event: any) {
  //   this.selectedMarketID = event.value;
  //   console.log('Selected Market ID:', this.selectedMarketID);

  // }

  // onDateChange(event: any) {

  //   console.log('Event:', event);  // Log event to check its structure

  //   const date = event; // Check if event.value is a Date object

  //   if (date instanceof Date) { // Ensure date is a Date object
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const day = String(date.getDate()).padStart(2, '0');

  //     this.selectedDate = `${year}-${month}-${day}`;
  //     console.log('Selected Date:', this.selectedDate);

  //   } else {
  //     console.error('Invalid date');
  //   }
  // }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.E')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.Delete')) {
      this.permission.delete = true;
    }
    this.getstockmarkets();

  }
  getEPfficail() {
    this.loading = true;
    this.selectedDate = moment(this.selectedDate).format("YYYY-MM-DD");
    if (this.selectedDate && this.selectedMarketID) {
      this.officialIndicsService.getOfficialIndicsByPriceDateAndStockMarketID(this.selectedDate, this.selectedMarketID)
        .subscribe({
          next: (res) => {
            this.selectedDate = moment(this.selectedDate).format("MM/DD/YYYY");
            this.loading = false;
            // Check if res is an array and map items with boolean conversion
            if (Array.isArray(res)) {
              this.OfficailIndics = res.map(item => ({
                ...item,
                isActive: !!item.isActive // Convert to boolean
              }));
              console.log('EodPrices after mapping:', this.OfficailIndics); // Debugging output
            } else {
              console.error('Unexpected data format:', res);
            }
          },
          error: (err) => {
            console.error('Error fetching EOD prices:', err); // Handle errors
            this.loading = false;
          }
        });
    } else {
      this.loading = false
      console.error('Selected date or market ID is not defined.');
    }
  }

  showImportModel(){
    this.showImportPriceModal =true;
  }
  // onFileChange(event:any){
  //   this.importFile = event.target.files[0];
  //   console.log(event);
  // }
  
    // importOfficialIndices(){
    //   this.loading = true;
    //  const formData = new FormData();
    //  formData.append('file', this.importFile);
    //   this.importService.importOfficialIndices(formData).subscribe(res => {
    //    debugger;
    //    if(res == "1")  {
    //       Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: ' file imported successfully', icon: 'success', });
    //       this.showImportPriceModal = false;
    //       this.importFile = null;
    //     this.getEPfficail();
    //     }        
    //    else    {
    //       Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: res, icon: 'error', });
    //     }
  
    //     this.loading = false;
    //   },
    //     error => {
    //       this.loading = false;
    //     },
    //     () => {
    //       this.loading = false;
    //     });
    // }

    onFileChange(event: any) {
      
      debugger;
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
  
          // Convert the worksheet to JSON with the first row as headers
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
          // Log jsonData to inspect the structure
          console.log('jsonData:', jsonData);
  
          // Ensure headers is of type string[] (array of strings)
          const headers: string[] = Array.isArray(jsonData[0]) ? jsonData[0] : [];
          console.log('headers:', headers);
  
          // Check if headers is empty or not in the expected format
          if (headers.length === 0) {
              alert('Invalid or missing headers.');
              return;
          }
  
          // Check if there is any data
          if (jsonData.length <= 1) {
              console.error('No data found in the sheet.');
              return;
          }
  
          // Format the data using the column names from the header row
          const formattedData = jsonData.slice(1).map((row: any) => {
          
                   const StockMarket = row[headers.indexOf('StockMarket')]?.trim();
             
            
                    // Using `trim()` to clean any potential extra spaces from headers
                    const sector = row[headers.indexOf('Sector')]?.trim() == undefined ? null : row[headers.indexOf('Sector')]?.trim();
                                  
                                  
                    const dateValue = row[headers.indexOf('Date')];

                    const open = parseFloat(row[headers.indexOf('Open')])?.toFixed(2); // Parsing and fixing decimal places
                    const high = parseFloat(row[headers.indexOf('High')])?.toFixed(2);
                    const low = parseFloat(row[headers.indexOf('Low')])?.toFixed(2);
                    const close = parseFloat(row[headers.indexOf('Close')])?.toFixed(2);
                    const volume = parseFloat(row[headers.indexOf('Volume')])?.toFixed(0); // Volume is an integer
                    const transaction = parseFloat(row[headers.indexOf('Transaction')])?.toFixed(0); // Transactions is an integer
                    const value = parseFloat(row[headers.indexOf('Value')])?.toFixed(2);
                    const previousClose = row[headers.indexOf('PreviousClose')]?.toFixed(2) == undefined ? null : row[headers.indexOf('PreviousClose')]?.toFixed(2);

                    let date: Date | null = null;

                    // Handle date formatting
                    if (typeof dateValue === 'number') {
                        // Excel numeric date conversion (if number is passed)
                        const dateCode = XLSX.SSF.parse_date_code(dateValue);
                        date = new Date(Date.UTC(dateCode.y, dateCode.m - 1, dateCode.d));
                    } else if (typeof dateValue === 'string') {
                        date = new Date(dateValue); // Parse string date
                    }

                    // If date parsing fails, make sure to set it as null
                    if (isNaN(date?.getTime())) {
                        date = null;
                    }

                    // Return the formatted data with safe types
                    return {
                        sector,
                        StockMarket,
                        date,
                        open,
                        high,
                        low,
                        close,
                        volume,
                        transaction,
                        value,
                        previousClose
                    };
              
              
          }).filter((item: any) => item.date != null);  // Remove any invalid rows

          // Pass the formatted data to the import function
          this.importCurrencyData(formattedData);
      };
  
      reader.readAsBinaryString(file);
  }
  
  
  importCurrencyData(data: any) {
    this.loading = true;
    console.log(data);
    if (!Array.isArray(data)) {
      console.error('Data passed to import Official Indices Data is not an array:', data);
      return;
    }
      
            this.importofficail = [];  
            this.importofficail = [...this.importofficail, ...data];

            if (!Array.isArray(this.importofficail)) {
              console.error('this.importofficail is not an array. Initializing as an empty array.');
              this.importofficail = [];
            }
        

      this.loading = false;
  }

  importOfficialIndices() {
    // Check if the currencies list is empty or not defined
    if (!this.importofficail || this.importofficail.length === 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'No Official Indices to save.',
        icon: 'error',
      });
      return;  // Prevent further execution
    }

    this.loading = true; // Show loading spinner
    this.importofficail = this.importofficail.filter((x: any | null): x is any => x !== null);
     this.officialIndicsService.importOfficialIndicesByList(this.importofficail).subscribe(
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
          this.loading = false;
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
        this.getEPfficail();
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
        this.loading = false;
      },
      () => {
        this.loading = false; // Hide loading spinner when the request completes
      }
    );
  }
  
  
}
