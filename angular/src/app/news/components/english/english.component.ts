import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { News_English } from 'src/app/services/permissions';
import { NewsDto, NewsService } from '@proxy/news';
import * as moment from 'moment';
import { FileService } from 'src/app/services/file/file.service';
import { environment } from 'src/environments/environment';
 

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
  @ViewChild('imgContactAvatar') imgContactAvatar!: FileUpload;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean,
    approved: boolean
  }
  filteredCountries: any[];
  ingredient:any;
  apiUrl: string = "";
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  newsId: number;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  newsCategories = [];
  countries = [];
  newsEngs: NewsDto[] = [];
  newsEng: NewsDto = {
    newsID: 0,
    isHotNews: false,
    isApproved:false
  }

  constructor(
    private commonService: CommonService,
    public fileService: FileService,
    private newsEngService: NewsService,private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false,
      approved:false
    }
  }
  ngOnInit() { 
    this.loading = true;
    this.apiUrl = environment.apis.default.url + "/uploads/";
    if (this.permissionService.getGrantedPolicy(News_English + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_English + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_English + '.Delete')) {
      this.permission.delete = true;
    }
    if (this.permissionService.getGrantedPolicy(News_English + '.Approved')) {
      this.permission.approved = true;
    }
    this.getStockMarkets();
    this.getNewsCatAndCountries();
    // this.stockMarketID = 0;
    this.getNewsEngs();
    this.newsEng.isHotNews = true;
    this.newsEng.isHome = true;
    this.newsEng.islamic = true;
    this.newsEng.forSocialNetworks = true;
    this.newsEng.isGulfbaseNews = true;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
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
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
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
      if (this.companyMarketSectors.length > 0){
        if(!this.sectorID)
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
      } 
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
         if(this.companiesTickers.length > 0){
          if(!this.companyID)
          this.companyID = this.companiesTickers[0].companyID
         } 
        this.loading = false;
      });
  }

  onUpload(event) {
    let fileReader = new FileReader();
    for (let file of event.files) {
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
          // Will print the base64 here.
          console.log(fileReader.result);
          
      };
      this.newsEng.newsImage = "";
    }
  }

  uploadLogo(){
    this.loading = true;
    this.fileService.uploadImage(this.imgContactAvatar._files[0])
        .subscribe((res: any) => {
          this.newsEng.newsImage = res;
          this.imgContactAvatar = null;
          this.loading = false;
        });
  }

  getNewsEngs() {
    debugger;
    this.newsEngService
      .getNewsByLangIdAndNewsId(true,this.newsId)
      .subscribe(res => {
        debugger;
        this.newsEngs = res;
        this.loading = false;
      });
  }

  searchByNewsId(){
    this.getNewsEngs();
  }

  handleNewsEng(newsEng: NewsDto) {
    this.newsEng = newsEng;
    this.newsEng.date = moment(this.newsEng.date).format("MM/DD/YYYY");
    this.loading = false;
  }
  addNewNewsEng(){
    this.newsEng = {
      newsID: 0,
      isHotNews:false,
      isApproved:false,
    }
    this.newsEng.date = moment().format("MM/DD/YYYY")
    this.stockMarkets = [];
    this.companyMarketSectors = [];
    this.companiesTickers = [];
    this.companyID =0;
    this.selectedItem = null;
    this.newsEng.isHotNews = true;
    this.newsEng.isHome = true;
    this.newsEng.islamic = true;
    this.newsEng.forSocialNetworks = true;
    this.newsEng.isGulfbaseNews = true;
  }

  deleteNews(newsEng: NewsDto){
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
        this.newsEngService.deleteNewsByLangIdAndNewsId(true,newsEng.newsID).subscribe(res => {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsEng.title + ' deleted successfully', icon: 'success', });
          this.getNewsEngs();         
    
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


  createOrUpdateNewsEng() {
    debugger;
    this.loading = true;
    this.newsEng.companyID = this.companyID;
    this.newsEng.gulfBaseSectorID = this.sectorID;
    this.newsEng.langID=true;
    this.newsEng.isApproved=false;
    this.newsEng.date = moment(this.newsEng.date).format();
    this.newsEngService.createOrUpdateNewsByInput(this.newsEng).subscribe(res => {
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
    

  createOrUpdateApprovedNewsEng() {
    debugger;
    this.loading = true;
    this.newsEng.companyID = this.companyID;
    this.newsEng.gulfBaseSectorID = this.sectorID;
    this.newsEng.langID=true;
    this.newsEng.isApproved=true;
    this.newsEng.date = moment(this.newsEng.date).format();
    this.newsEngService.createOrUpdateNewsByInput(this.newsEng).subscribe(res => {
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
