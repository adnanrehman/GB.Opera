import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { NewsDto, NewsService, NewsSourceDto } from '@proxy/news';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { News_Arabic } from 'src/app/services/permissions';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FileService } from 'src/app/services/file/file.service';
import { environment } from 'src/environments/environment';
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
  @ViewChild('imgContactAvatar') imgContactAvatar!: FileUpload;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean,
    approved:boolean
  }
  filteredCountries: any[];
  ingredient: any;
  loading: boolean = false;
  headerValue: any;
  apiUrl: string = "";
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
  source : NewsSourceDto[]=[];
  newsArab: NewsDto = {
    newsID: 0,
    isHotNews: false,
    isApproved:false
  }

  constructor(
    private commonService: CommonService,
    public fileService: FileService,  
    private newsArabService: NewsService, private permissionService: PermissionService,private cdr: ChangeDetectorRef
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
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.Delete')) {
      this.permission.delete = true;
    }
   
    if (this.permissionService.getGrantedPolicy(News_Arabic + '.Approved')) {
      this.permission.approved = true;
    }
    this.getStockMarkets();
    this.getNewsCatAndCountries();
    // this.stockMarketID = 0;
    this.getNewsArabs();
    this.newsArab.isHotNews = true;
    this.newsArab.isHome = true;
    this.newsArab.islamic = true;
    this.newsArab.forSocialNetworks = true;
    this.newsArab.isGulfbaseNews = true;
    this.getSource(0)
  }

  getSource(id: number) {
    this.newsArabService.getSourceByNewsId(id).subscribe(res => {
      this.source = res;
    });
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
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
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
      this.newsArab.newsImage = "";
    }
  }

  // uploadLogo(){
  //   this.loading = true;
  //   this.fileService.uploadImage(this.imgContactAvatar._files[0])
  //       .subscribe((res: any) => {
  //         this.newsArab.newsImage = res;
  //         this.imgContactAvatar = null;
  //         this.loading = false;
  //       });
  // }
   
    uploadLogo() {
      this.loading = true;
     
      const file = this.imgContactAvatar.files[0];
      if (file) {
      
        this.fileService.uploadImageOnBlobStorage(file).subscribe((res: any) => {
          this.newsArab.newsImage = res;   
          
         
          this.imgContactAvatar.clear(); 
          
         
          this.cdr.detectChanges();
          
          this.loading = false;
        }, (error) => { 
          this.loading = false;
        });
      } else {
 
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Error!',
          text: 'Please select an image to upload',
          icon: 'error',
        });
  
        this.loading = false;
      }
    }
   

  addNewNewsArab(){
    this.newsArab = {isHotNews:false,isApproved:false};
    this.newsArab.date = moment().format("MM/DD/YYYY")
    this.stockMarkets = [];
    this.companyMarketSectors = [];
    this.companiesTickers = [];
    this.companyID =0;
    this.selectedItem = null;
    this.newsArab.isHotNews = true;
    this.newsArab.isHome = true;
    this.newsArab.islamic = true;
    this.newsArab.forSocialNetworks = true;
    this.newsArab.isGulfbaseNews = true;
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
        if (this.companiesTickers.length > 0){
          if(!this.companyID)
            this.companyID = this.companiesTickers[0].companyID
        } 
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
    if(!this.newsArab.newsCategoryID){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'Please select a category',
        icon: 'error',
      });
      this.loading = false;
      return;
    }
    if(!this.newsArab.title){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'Please add any title',
        icon: 'error',
      });
      this.loading = false;
      return;
    }
    if (!this.newsArab.date ) {
      // If date is empty or invalid, show the validation message
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'Please select a valid date',
        icon: 'error',
      });
  
      // Stop further processing
      this.loading = false;
      return;
    }
    this.newsArab.companyID = this.companyID;
    this.newsArab.gulfBaseSectorID = this.sectorID;
    this.newsArab.langID = false;
    this.newsArab.isApproved=false;
    this.newsArab.date = moment(this.newsArab.date).format();
    this.newsArabService.createOrUpdateNewsByInput(this.newsArab).subscribe(res => {
      debugger;
      if (this.newsArab.newsID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' updated successfully', icon: 'success', });
        this.handleNewsArab(this.newsArab);
        this.addNewNewsArab();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' created successfully', icon: 'success', });
        this.getNewsArabs();
        this.addNewNewsArab();
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
  createOrUpdateapprovedNewsArab() {
    debugger;
    this.loading = true;

    if (!this.newsArab.date ) {
      // If date is empty or invalid, show the validation message
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'Please select a valid date',
        icon: 'error',
      });
  
      // Stop further processing
      this.loading = false;
      return;
    }
    this.newsArab.companyID = this.companyID;
    this.newsArab.gulfBaseSectorID = this.sectorID;
    this.newsArab.langID = false;
    this.newsArab.isApproved=true;
    this.newsArab.date = moment(this.newsArab.date).format();
    this.newsArabService.createOrUpdateNewsByInput(this.newsArab).subscribe(res => {
      debugger;
      if (this.newsArab.newsID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' updated successfully', icon: 'success', });
        this.handleNewsArab(this.newsArab);
        this.addNewNewsArab();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.newsArab.title + ' created successfully', icon: 'success', });
        this.getNewsArabs();
        this.addNewNewsArab();
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
