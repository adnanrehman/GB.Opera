import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsEngDto, NewsEngService } from '@proxy/news-engs';
import { CommonService } from '@proxy/commons';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { News_English } from 'src/app/services/permissions';

@Component({
  selector: 'app-english',
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
  templateUrl: './english.component.html',
  styleUrl: './english.component.scss'
})
export class EnglishComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  filteredCountries: any[];
  ingredient:any;
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
  newsEngs: NewsEngDto[] = [];
  newsEng: NewsEngDto = {
    newsID: 0
  }

  constructor(
    private commonService: CommonService,
    private newsEngService: NewsEngService,private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(News_English + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_English + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_English + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.getNewsCatAndCountries();
    this.stockMarketID = 0;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading =true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading =false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading =true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getStockMarketSectorsByStockMarketID();
    this.loading =false;
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
        if(this.companiesTickers.length > 0) this.companyID = this.companiesTickers[0].companyID
        this.loading = false;
      });
  }

  getNewsEngs() {
    debugger;
    this.newsEngService
      .getNewsEngs()
      .subscribe(res => {
        debugger;
        this.newsEngs = res;
        if (this.newsEngs.length > 0){
          this.handleNewsEng(this.newsEngs[0]);
        }
      });
  }

  handleNewsEng(newsEng: NewsEngDto) {
    this.newsEng = newsEng;
    this.loading = false;
  }
  addNewNewsEng(){
    this.newsEng = {
      newsID: 0
    }
  }

  createOrUpdateNewsEng() {
    debugger;
    this.loading = true;
    this.newsEng.companyID = this.companyID;
    this.newsEng.gulfBaseSectorID = this.sectorID;
    this.newsEng.langID=true;
    this.newsEng.date = new Date(this.newsEng.date).toLocaleString();
    this.newsEngService.createOrUpdateNewsEngByInput(this.newsEng).subscribe(res => {
      debugger;
      if(this.newsEng.newsID > 0){
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsEng.title + ' updated successfully', icon: 'success', });
        this.handleNewsEng(this.newsEng);
      }
      else{
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsEng.title + ' created successfully', icon: 'success', });
        this.getNewsEngs();
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
