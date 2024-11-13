import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { CurrentDividendDto, CurrentDividendService } from '@proxy/current-dividends';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { Financial_CurrentDividends } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-current-dividends',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './current-dividends.component.html',
  styleUrl: './current-dividends.component.scss'
})
export class CurrentDividendsComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  stockMarketID: number;
  currentDividends: CurrentDividendDto[] = [];
  stockMarkets = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService,
    private commonService: CommonService,
    private currentDividendService: CurrentDividendService
  ){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_CurrentDividends + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CurrentDividends + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CurrentDividends + '.Delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.getCurrentDividendsByStockMarketID();
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.stockMarkets = res;
      if(this.stockMarkets.length > 0){
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getCurrentDividendsByStockMarketID();
      }
    });
  }

  getCurrentDividendsByStockMarketID() {
    debugger;
    this.loading = true;
    this.currentDividendService.getCurrentDividendsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.currentDividends = res;
      this.loading = false;
    });
  }

  insertUpdateCalculateCompQuartersNetProfitByInput() {
    debugger;
    this.loading = true;
    this.currentDividendService.insertUpdateCurrentDividendsByInput(this.currentDividends).subscribe(res => {
      debugger;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:' Updated successfully', icon: 'success', });
      this.getCurrentDividendsByStockMarketID();
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
