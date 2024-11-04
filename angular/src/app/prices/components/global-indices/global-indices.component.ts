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
  onFileChange(event:any){
    this.importFile = event.target.files[0];
    console.log(event);
  }
  
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
}
