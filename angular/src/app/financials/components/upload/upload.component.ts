import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { Financial_Upload } from 'src/app/services/permissions';
import { CommonService } from '@proxy/commons/common.service';
import { NewsEngDto } from '@proxy/news-engs';
import { ListboxModule } from 'primeng/listbox';
import { UploadService } from '@proxy/uploads/upload.service';
import { UploadwithHasDtos } from '@proxy/uploads/models';

@Component({
  selector: 'app-upload',
  standalone: true,

  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,
    ImageModule,FileUploadModule,TabViewModule,CheckboxModule,ListboxModule ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  stockMarkets = [];
  filteredCountries: any[];
  companyMarketSectors = [];
  newsEngs: NewsEngDto[] = [];
  stockMarketID: number;
  sectorID: number;
  companiesTickers = [];

  quarter = [];
  period = [];
  entryusers = [];
  reentryusers = [];
  NewType=[];

  data: UploadwithHasDtos | null = null;

   
 
  companyID: number;
  newsEng: NewsEngDto = {
    newsID: 0
  }
  
  constructor( 
    private permissionService: PermissionService,private commonService: CommonService,private uploadService : UploadService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }

 } 
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Eit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.Dlete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.getEntryusers();
    
    
  }


getEntryusers()
{
  this.uploadService._getEntryReEntryUsers().subscribe(res=>
  {
    //   const userJson = JSON.stringify(res); 
     //   alert(userJson);
    this.entryusers=res.filter(user => user.userType==='Entry Operator');
    this.reentryusers=res.filter(user => user.userType==='Re Entry Operator');
   

  });
  
}
 
  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
    });
  }

  getUploadData() {
    this.uploadService.uploadwithHasDtosByMarketIDAndSectorID(this.stockMarketID, this.sectorID)
      .subscribe(
        (res: UploadwithHasDtos) => {
          this.data = res; // Assign the response directly
  
    this.quarter=this.data.qPeriodType
    this.period=this.data.period
    this.NewType=this.data.financialEntryType;
      //const userJson = JSON.stringify(this.NewType); 
     //  alert(userJson)

        },
        (error) => {
          console.error('Error uploading data:', error); // Handle errors gracefully
        }
      );
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    //this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getSectorCompaniesBySectorIDAndStockMarketID();
      //else this.loading = false;
    });
  }  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if(this.companiesTickers.length > 0) this.companyID = this.companiesTickers[0].companyID
        //this.loading = false;
      });
      this.getUploadData();
  }
 
  companies = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];

}
