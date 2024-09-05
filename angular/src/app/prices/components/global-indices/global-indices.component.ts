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
import { CheckboxModule } from 'primeng/checkbox';
import { OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_GlobalIndices } from 'src/app/services/permissions';

@Component({
  selector: 'app-global-indices',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CheckboxModule ],
  templateUrl: './global-indices.component.html',
  styleUrl: './global-indices.component.scss'
})
export class GlobalIndicesComponent {
  selectedDate: string | null = null;
  filteredCountries: any[];
  globalindices: any[];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
   
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_GlobalIndices + '.delete')) {
      this.permission.delete = true;
    }
     
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
  constructor(private officialIndicsService : OfficialIndicsService, private permissionService: PermissionService) { 
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
  }
  getGlobalIndices() {
    if (this.selectedDate  ) {
      this.officialIndicsService.getGlobalIndicesByPriceDate(this.selectedDate)
        .subscribe({
          next: (res) => {
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
          }
        });
    } else {
      console.error('Selected date or market ID is not defined.');
    }
  }
}
