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
import { EndofDayService } from '@proxy/end-of-day';
import { OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_Official } from 'src/app/services/permissions';
@Component({
  selector: 'app-official',
  standalone: true,
  imports: [TableModule, AutoCompleteModule, FormsModule, DropdownModule, CalendarModule, ImageModule, FileUploadModule, TabViewModule, RadioButtonModule],
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
  markets = [];
  selectedMarketID: number | null = null;
  selectedDate: string | null = null;
  ingredient: any;
  OfficailIndics: any[] = [];
  data: any[] = [
    { sm: "TASI", tick: "", op: "8.0200", hp: "7.9000", lp: "8.0000", cp: "8.0200", tv: "80933", tv2: "641389.7800", tr: "138", lcp: "8.0200", },

  ];
  constructor(private endofDayService: EndofDayService,
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
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_Official + '.delete')) {
      this.permission.delete = true;
    }
    this.getstockmarkets();

  }
  getEPfficail() {
    if (this.selectedDate && this.selectedMarketID) {
      this.officialIndicsService.getOfficialIndicsByPriceDateAndStockMarketID(this.selectedDate, this.selectedMarketID)
        .subscribe({
          next: (res) => {
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
          }
        });
    } else {
      console.error('Selected date or market ID is not defined.');
    }
  }
  
}
