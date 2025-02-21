import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { CompanyCurrentValuesService } from '@proxy/company-current-values';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-current-values',
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
   CheckboxModule,
   InputTextModule, ],
  templateUrl: './current-values.component.html',
  styleUrl: './current-values.component.scss'
})
export class CurrentValuesComponent {
  stockMarkets = [];
  stockMarketID: number;
  loading = false;
  companyMarketSectors = [];
  companiesTickers =  [];
  companyID: number;
  
 CurrentValues=[];

  ngOnInit() { 
    this.getStockMarkets();
  }

  constructor( 
    private permissionService: PermissionService,
    private commonService: CommonService,private companyCurrentValuesService : CompanyCurrentValuesService
    ){
   
 } 

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if(this.stockMarkets.length > 0){
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getStockMarketSectorsByStockMarketID();
      }
    });
  }

  getStockMarketSectorsByStockMarketID() {
   this.loading = true;
 
    this.commonService.getAllCompanies().subscribe(res => {
      this.companiesTickers = res.filter(res=> res.stockMarketID==this.stockMarketID);

      this.loading = false;
      
     /// if (this.companyMarketSectors.length > 0) this.getSectorCompaniesBySectorIDAndStockMarketID();
     // else this.loading = false;
    });
  } 

  getCompanyCuurrentValue() {
    this.loading = true;
  
     this.companyCurrentValuesService.getCompanyCurrentValuesByCompanyID(this.companyID).subscribe(res => {
       this.CurrentValues = res ;
 
      this.loading = false;
       
      
     });
   } 

  // getSectorCompaniesBySectorIDAndStockMarketID() {
  //   if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
  //     this.sectorID = this.companyMarketSectors[0].sectorID;
  //   this.commonService
  //     .getCompaniesWithHasFundByStockMarketID(this.sectorID, this.stockMarketID)
  //     .subscribe(res => {
       
  //       this.loading = false;
  //     });
   
  // }

}
