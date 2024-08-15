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
import { OfficialIndicsService } from '@proxy/officials-indics';
@Component({
  selector: 'app-gulfbase-price',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule ],
  templateUrl: './gulfbase-price.component.html',
  styleUrl: './gulfbase-price.component.scss'
})
export class GulfbasePriceComponent {
  filteredCountries: any[];
  ingredient:any;
  EodPrices: any[] = [];
  gulfbaseprices: any[] = [];
 
  selectedDate: string | null = null;
   
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
  constructor(private officialIndicsService : OfficialIndicsService) { }

  ngOnInit() { 
     
  }
  getgulfbaseprices() {
    if (this.selectedDate  ) {
      this.officialIndicsService.getgulfbasepricesByPriceDate(this.selectedDate)
        .subscribe({
          next: (res) => {
            // Check if res is an array and map items with boolean conversion
            if (Array.isArray(res)) {
              this.gulfbaseprices = res.map(item => ({
                ...item,
                isActive: !!item.isActive // Convert to boolean
              }));
              console.log('EodPrices after mapping:', this.gulfbaseprices); // Debugging output
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
