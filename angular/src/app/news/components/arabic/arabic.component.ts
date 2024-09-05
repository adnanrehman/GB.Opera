import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { NewsArabDto, NewsArabService } from '@proxy/news-arabs';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { News_Arabic } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arabic',
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
    RadioButtonModule,
    NgFor,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './arabic.component.html',
  styleUrl: './arabic.component.scss'
})
export class ArabicComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  filteredCountries: any[];
  ingredient: any;
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  newsCategories = [];
  countries = [];
  newsArabs: NewsArabDto[] = [];
  newsArab: NewsArabDto = {
    newsID: 0
  }

  constructor(
    private commonService: CommonService,
    private newsArabService: NewsArabService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.getNewsCatAndCountries();
    this.stockMarketID = 0;
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
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getStockMarketSectorsByStockMarketID();
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
    });
  }

  getNewsCatAndCountries() {
    this.commonService.getNewsCatAndCountries().subscribe(res => {
      this.newsCategories = res.newsCategories;
      this.countries = res.countries;
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getSectorCompaniesBySectorIDAndStockMarketID();
      else this.loading = false;
    });
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0) this.companyID = this.companiesTickers[0].companyID
        this.loading = false;
      });
  }

  getNewsArabs() {
    debugger;
    this.newsArabService
      .getNewsArabs()
      .subscribe(res => {
        debugger;
        this.newsArabs = res;
        if (this.newsArabs.length > 0) {
          this.handleNewsArab(this.newsArabs[0]);
        }
      });
  }

  handleNewsArab(newsArab: NewsArabDto) {
    this.newsArab = newsArab;
    this.loading = false;
  }

  createOrUpdateNewsArab() {
    debugger;
    this.loading = true;
    this.newsArab.companyID = this.companyID;
    this.newsArab.date = new Date(this.newsArab.date).toLocaleString();
    this.newsArabService.createOrUpdateNewsArabByInput(this.newsArab).subscribe(res => {
      debugger;
      if (this.newsArab.newsID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.aTitle + ' updated successfully', icon: 'success', });
        this.getNewsArabs();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.aTitle + ' created successfully', icon: 'success', });
        this.getNewsArabs();
      }
      this.handleNewsArab(this.newsArab);

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
