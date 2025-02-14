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
import { CheckboxModule } from 'primeng/checkbox';
import { OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_GlobalIndices } from 'src/app/services/permissions';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ImportService } from 'src/app/services/import/import.service';
import { DialogModule } from 'primeng/dialog';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-global-indices',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ThemeSharedModule,DialogModule,
    ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CheckboxModule,CommonModule ],
  templateUrl: './global-indices.component.html',
  styleUrl: './global-indices.component.scss'
})
export class GlobalIndicesComponent {
  loading:boolean = false;
  selectedDate = moment(new Date()).format("MM/DD/YYYY")
  filteredCountries: any[];
  selectedItem: any;
  suggestions: any[] = [];
  globalindices: any[];
  globalindicesImport: any[] = [];
  importFile:any;
  showImportPriceModal: boolean = false;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
   
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.Delete')) {
      this.permission.delete = true;
    }
    this.getGlobalIndices();
     
  }

  // search(event: AutoCompleteCompleteEvent) {
  //   this.loading = true;
  //   this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
  //     this.suggestions = res;
  //     this.loading = false;
  //   });
  // }

  // onSelect(event: any) {
  //   this.loading = true;
  //   debugger;
  //   this.sele = event.value.stockMarketID;
  //   this.getEPfficail();
  //   this.loading = false;
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
  constructor(private officialIndicsService : OfficialIndicsService,
    private importService: ImportService,
     private commonService:CommonService, private permissionService: PermissionService) { 
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
  }
  getGlobalIndices() {
    this.loading = true;
    debugger;
    this.selectedDate = moment(this.selectedDate).format("YYYY-MM-DD");
    if (this.selectedDate  ) {
      this.officialIndicsService.getGlobalIndicesByPriceDate(this.selectedDate)
        .subscribe({
          next: (res) => {
            this.selectedDate = moment(this.selectedDate).format("MM/DD/YYYY");
            this.loading = false;
            // Check if res is an array and map items with boolean conversion
            if (Array.isArray(res)) {
              this.globalindices = res.map(item => ({
                ...item,
                isActive: !!item.isActive // Convert to boolean
              }));
              console.log('EodPrices after mapping:', this.globalindices); // Debugging output

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
      console.error('Selected date or market ID is not defined.');
      this.loading = false;
    }
  }

  showImportModel(){
    this.showImportPriceModal =true;
  }
  // onFileChange(event:any){
  //   this.importFile = event.target.files[0];
  //   console.log(event);
  // }
  
  importGlobalIndices(){
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.importFile);
    this.importService.importGlobalIndices(formData).subscribe(res => {
      debugger;
      if(res == "1")  {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: ' file imported successfully', icon: 'success', });
        this.showImportPriceModal = false;
        this.importFile = null;
        this.getGlobalIndices();
      }        
      else    {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: res, icon: 'error', });
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
 

         debugger;     
      const formattedData = jsonData.slice(1).map((row: any) => {
        if(row[headers.indexOf('StockMarket')] != undefined){
          const stockMarket = row[headers.indexOf('StockMarket')].toString();
          const priceDate = row[headers.indexOf('Date')];
          let date: Date;
  
          if (typeof priceDate === 'number') {
            const dateCode = XLSX.SSF.parse_date_code(priceDate);
            date = new Date(Date.UTC(dateCode.y, dateCode.m - 1, dateCode.d));
  
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
  
            const dates = `${year}-${month}-${day}`;
          } else if (typeof priceDate === 'string') {
  
            date = new Date(priceDate);
          } else {
            date = null;
          }
           
          const open = parseFloat(row[headers.indexOf('Open')]);  
          const high = parseFloat(row[headers.indexOf('High')]);  
          const low = parseFloat(row[headers.indexOf('Low')]);  
          const close = parseFloat(row[headers.indexOf('Close')]);  
          const volume = parseFloat(row[headers.indexOf('Volume')]);      

          return {
            stockMarket,
            date,
            open,
            high,
            low,
            close,
            volume,
          };
        }

      });

       this.importData(formattedData);
    };

    reader.readAsBinaryString(file);

  }

  importData(data: any) {

    this.loading = true;
    this.globalindicesImport = [];
    if (!Array.isArray(data)) {
      console.error('Data passed to importCurrencyData is not an array:', data);
      return;
    }

    if (!Array.isArray(this.globalindicesImport)) {
      console.error('Date is not an array. Initializing as an empty array.');
      this.globalindicesImport = [];
    }

    this.globalindicesImport = [...this.globalindicesImport, ...data];
    this.loading = false;
  }

  InsertGlobalIndices() {
    // Check if the currencies list is empty or not defined
    if (!this.globalindicesImport || this.globalindicesImport.length === 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'No Data to save.',
        icon: 'error',
      });
      return;  // Prevent further execution
    }

    this.loading = true; // Show loading spinner
debugger;
    this.officialIndicsService.importGlobalIndicesByList(this.globalindicesImport).subscribe(
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
        this.getGlobalIndices();
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
