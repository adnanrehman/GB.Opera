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
    this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    this.loading = true;
    debugger;
    this.selectedMarketID = event.value.stockMarketID;
    this.getEPfficail();
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
  onFileChange(event:any){
    this.importFile = event.target.files[0];
    console.log(event);
  }
  
  importOfficialIndices(){
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.importFile);
    this.importService.importOfficialIndices(formData).subscribe(res => {
      debugger;
      if(res == "1")  {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: ' file imported successfully', icon: 'success', });
        this.showImportPriceModal = false;
        this.importFile = null;
        this.getEPfficail();
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
