import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { NewsDto, NewsService } from '@proxy/news';
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
import * as moment from 'moment';
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
  newsId:number;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  newsCategories = [];
  countries = [];
  newsArabs: NewsDto[] = [];
  newsArab: NewsDto = {
    newsID: 0
  }

  constructor(
    private commonService: CommonService,
    private newsArabService: NewsService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }
  ngOnInit() {
    this.loading = true;
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
    this.getNewsArabs();
  }

  search(event: AutoCompleteCompleteEvent) {
    
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      
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

  addNewNewsArab(){
    this.newsArab = {};
    this.newsArab.date = moment().format("MM/DD/YYYY")
    this.stockMarkets = [];
    this.companyMarketSectors = [];
    this.companiesTickers = [];
    this.companyID =0;
    this.selectedItem = null;
    // this.getNewsArabs();
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
        // if (this.companiesTickers.length > 0) this.companyID = this.companiesTickers[0].companyID
        this.loading = false;
      });
  }

  getNewsArabs() {
    debugger;
    this.newsArabService
      .getNewsByLangIdAndNewsId(false,this.newsId)
      .subscribe(res => {
        debugger;
        this.newsArabs = res;
        this.loading = false;
      });
  }

  handleNewsArab(newsArab: NewsDto) {
    this.newsArab = newsArab;
    this.newsArab.date = moment(this.newsArab.date).format("MM/DD/YYYY");
    this.loading = false;
  }

  searchByNewsId(){
    this.getNewsArabs();
  }

  deleteNews(newsArab: NewsDto){
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this News?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.newsArabService.deleteNewsByLangIdAndNewsId(false,newsArab.newsID).subscribe(res => {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' deleted successfully', icon: 'success', });
          this.getNewsArabs();         
    
          this.loading = false;
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        });
      }
    })
  }

  createOrUpdateNewsArab() {
    debugger;
    this.loading = true;
    this.newsArab.companyID = this.companyID;
    this.newsArab.gulfBaseSectorID = this.sectorID;
    this.newsArab.langID = false;
    this.newsArab.date = moment(this.newsArab.date).format();
    this.newsArabService.createOrUpdateNewsByInput(this.newsArab).subscribe(res => {
      debugger;
      if (this.newsArab.newsID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' updated successfully', icon: 'success', });
        this.handleNewsArab(this.newsArab);
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' created successfully', icon: 'success', });
        this.getNewsArabs();
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
