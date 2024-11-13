import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { CompanyAndMarket_MarketSector } from 'src/app/services/permissions';
import { CommonModule } from '@angular/common';
import { MarketSectorService } from '@proxy/market-sectors';
import { ListboxModule } from 'primeng/listbox';
import { InsertmarketsectorDto, StockMarketByID } from '@proxy/market-sector';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
 

@Component({
  selector: 'app-market-sector',
  standalone: true,
  imports: [TableModule, TreeModule, CalendarModule, AutoCompleteModule,
    FormsModule, DropdownModule, ImageModule, FileUploadModule, CheckboxModule, 
    CommonModule, ListboxModule,ThemeSharedModule],
  templateUrl: './market-sector.component.html',
  styleUrl: './market-sector.component.scss'
})
export class MarketSectorComponent {
  loading: boolean = false;
  Caps: TreeNode[]
  filteredCountries: any[];
  GBSector: TreeNode[];
  CountryGroup = []
  Country = []
  CountrySelect = []
  Stockmarket = []
  capSizes = [];
  sectors = []
  Currency = [];
  //stockMarketById: StockMarketByID
  Marketssector = [];
  marketCaps=[];
  selectedCapsizess=[];
  selectedmarketsector=[];
  stockMarketID=0;
  countryGroupActivation!: number;
  countryGroupID: number;
  stockMarketById: StockMarketByID = {
    stockMarketID: 0,
    isActive: false,
    
  }

  insertmarketsectorDto : InsertmarketsectorDto = {
    stockMarketByID: undefined,
    marketsSector:  [],
  marketCaps:  [],
  }
   
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(private permissionService: PermissionService, private marketSectorService: MarketSectorService) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }

  }
  

  ngOnInit() {
   
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.Delete')) {
      this.permission.delete = true;
    }
   
     this.getMarketsInfo(0);
    
    this.filteredCountries = [
      { name: "GCC", code: 'GCC' },
      { name: "Europe", code: 'Europe' },
      { name: "Asia", code: 'Asia' },
      { name: "Americas", code: 'Americas' },
      { name: "The World<", code: 'The World<' },
    ]

  



  }
  getMarketsInfo(id:number) {
    this.loading = true;
    this.marketSectorService.getMarketsInfoByMarketID(id).subscribe(res => {
      this.Stockmarket = res.stockMarket
    //   const userJson = JSON.stringify(this.Stockmarket); 
      // console.log('User JSON:', userJson);
       
      this.CountryGroup = res.countrygroup;
      this.Country = res.country;
      this.Currency = res.currency;
      
      this.capSizes = res.capacitySize
      this.sectors = res.sector
 

      this.stockMarketById = { ...res.stockMarketById[0] };
      this.stockMarketID=this.stockMarketById.stockMarketID;
      this.countryGroupActivation = this.stockMarketById.isActive ? 1 : 0;
       
      const countryID = { ...res.stockMarketById[0] }.countryID;
      const filteredCountries = this.Country.filter(country => country.countryID === countryID);
        
    // const userJson = JSON.stringify(filterListNewi); 
        //alert("u"+userJson);
      this.countryGroupID = filteredCountries.length > 0 ? filteredCountries[0].countryGroupID : null;
     
      this.getCountryByGroupId()
      this.Marketssector = res.marketSectors;
      this.marketCaps=res.marketCap;
 
      const filterListNew = this.marketCaps.filter(f => f.stockMarketID === 
        this.stockMarketById.stockMarketID);
      
      this.selectedCapsizess = filterListNew.map(item => ({
       
        capSizeID: item.capSizeID,
        capSize:item.capSize,
        
      }));
      
      const filterListNewi = this.Marketssector.filter(f => f.stockMarketID === 
        this.stockMarketById.stockMarketID);
       // const userJson = JSON.stringify(filterListNewi); 
        //alert("u"+userJson);
        this.selectedmarketsector = filterListNewi.map(item => ({
       
          sectorID: item.sectorID,
          sector:item.sector,
          
        }));
          // const userJson = JSON.stringify(this.sectors); 
         //alert("u"+userJson);

    });
    this.loading = false;
  }
  

  getCountryByGroupId() {

    this.CountrySelect = null;
    this.CountrySelect = this.Country.filter(country => country.countryGroupID === this.countryGroupID);
   // alert(this.CountrySelect);
  }
  onStockMarketChange(event) {
    const selectedID = event.value;  
       
    this.getMarketsInfo(selectedID);  
  }
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  insertCountryGroup() {
    debugger;
    this.loading = true;
    this.stockMarketById.isActive = this.countryGroupActivation == 1 ? true : false;
    this.insertmarketsectorDto.stockMarketByID = this.stockMarketById;
    this.insertmarketsectorDto.marketsSector = this.selectedmarketsector;
    this.insertmarketsectorDto.marketCaps = this.selectedCapsizess;
    // const userJson = JSON.stringify(this.insertmarketsectorDto); 
    // alert(userJson);
    this.marketSectorService.insertCountryGroupByModel(this.insertmarketsectorDto).subscribe(res => {
      debugger;
      if (this.stockMarketById.stockMarketID > 0) {
      //  Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!'  });
       this.getMarketsInfo(0);
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:  ' updated successfully', icon: 'success', });
      // this.addNewCountryGroup();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!'  });
       this.getMarketsInfo(0);
      }
      // this.handleCorporateAnnouncement(this.corporateAnnouncement);

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
