import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { MFundPrices, OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_FundPrices } from 'src/app/services/permissions';

@Component({
  selector: 'app-fund-prices',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CheckboxModule ],
  templateUrl: './fund-prices.component.html',
  styleUrl: './fund-prices.component.scss'
})
export class FundPricesComponent {
  @ViewChild('priceInput') priceInput: ElementRef<HTMLInputElement>;
  @ViewChild('calendar') calendar: Calendar;
  @ViewChild('checkbox') checkbox: Checkbox;
  filteredCountries: any[];
  checkboxState: boolean;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  ingredient:any;
  markets:any;
  funds:any;
  data: MFundPrices[]
  selectedMarketID: number | null = null;
  selectedfunfId: number | null = null;
  
  constructor( private officialIndicsService : OfficialIndicsService,private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   }
  ngAfterViewInit() {
    this.usp_getAllFundPrices();
  }
  getMFundCompanies() {
    this.officialIndicsService.getMFundCompanies().subscribe(res => {
      this.markets = res;
    });
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.delete')) {
      this.permission.delete = true;
    }
    this.getMFundCompanies();
     
  }
  onDropdownChange(event: any) {
    this.selectedMarketID = event.value;
    this.usp_getAllFunds();
     
  }
  onDropdownFundChnage(event: any) {
    this.selectedfunfId = event.value;
    this.usp_getAllFundPrices();
     
  }
  usp_getAllFunds() {
    this.officialIndicsService.getAllFundsByCompanyID(this.selectedMarketID).subscribe(res => {
      this.funds = res;
    });
  }
  usp_getAllFundPrices() {
    this.officialIndicsService.getAllFundPricesByMFundID(this.selectedfunfId).subscribe(res => {
      this.data = res;
      this.updateInputValue();
    });
  }
  updateInputValue() {
    if (this.priceInput && this.data.length > 0) {
      const firstItem = this.data[0];

      // Setting price input value
      const valueToSet = firstItem?.closingPrice != null ? firstItem.closingPrice.toString() : '';  
      this.priceInput.nativeElement.value = valueToSet;

      // Setting calendar value
      if (this.calendar) {
        const dateToSet = firstItem?.priceDate ? new Date(firstItem.priceDate) : null;
        if (dateToSet instanceof Date && !isNaN(dateToSet.getTime())) {
          // Set the calendar value after a short delay to ensure initialization
          setTimeout(() => {
            this.calendar.value = dateToSet;
          }, 0);
        } else {
          console.error('Invalid date:', dateToSet);
        }
      }
      if (this.checkbox) {
        // Convert isActive to boolean
        let checkboxState: boolean;
        if (typeof firstItem.isActive === 'string') {
          checkboxState = firstItem.isActive === 'Yes';
        } else if (typeof firstItem.isActive === 'boolean') {
          checkboxState = firstItem.isActive;
        } else {
          checkboxState = false; // Default value if unknown type
        }
  
        // Set the checkbox state
        this.checkboxState = checkboxState;
      }
  }
}
}
