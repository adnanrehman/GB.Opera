import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
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

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,  DialogModule,  ThemeSharedModule,
    DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CommonModule ],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {
  filteredCountries: any[];
  ingredient:any;
  importFile:any;
  loading: boolean = false;
  showImportPriceModal: boolean = false;
  
  markets = [];

  EodPrices: any[] = [];
  selectedMarketID: number | null = null;
  selectedDate: string | null = null;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(private endofDayService : EndofDayService ,
    public importService: ImportService,
     private permissionService: PermissionService){
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }

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
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
    this.getstockmarkets();
  }
getstockmarkets(){
  this.endofDayService.getAllGCCSector().subscribe(res =>{
this.markets=res;
  });
}
onDropdownChange(event: any) {
  this.selectedMarketID = event.value;
  console.log('Selected Market ID:', this.selectedMarketID);
  
}
onDateChange(event: any) {
  
  console.log('Event:', event);  // Log event to check its structure

  const date = event; // Check if event.value is a Date object
  
  if (date instanceof Date) { // Ensure date is a Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    this.selectedDate = `${year}-${month}-${day}`;
    console.log('Selected Date:', this.selectedDate);
     
  } else {
    console.error('Invalid date');
  }
}


getEodPrices() {
  if (this.selectedDate && this.selectedMarketID) {
    this.endofDayService.eodPricesByPriceDateAndStockMarketID(this.selectedDate, this.selectedMarketID)
      .subscribe({
        next: (res) => {
          // Check if res is an array and map items with boolean conversion
          if (Array.isArray(res)) {
            this.EodPrices = res.map(item => ({
              ...item,
              isActive: !!item.isActive // Convert to boolean
            }));
            console.log('EodPrices after mapping:', this.EodPrices); // Debugging output
          } else {
            console.error('Unexpected data format:', res);
          }
        },
        error: (err) => {
          console.error('Error fetching EOD prices:', err); // Handle errors
        }
      });
  } else {
    console.error('Selected date or market ID is not defined.');
  }
}

showImportModel(){
  this.showImportPriceModal =true;
}
onFileChange(event:any){
  this.importFile = event.target.files[0];
  console.log(event);
}

ImportPrices(){
  this.loading = true;
  const formData = new FormData();
  formData.append('file', this.importFile);
  this.importService.importPrices(formData).subscribe(res => {
    debugger;
    if(res == "1")  {
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: ' file importrd successfully', icon: 'success', });
      this.showImportPriceModal = false;
      this.importFile = null;
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
 
