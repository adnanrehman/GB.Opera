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

@Component({
  selector: 'app-market-sector',
  standalone: true,
  imports: [TableModule, TreeModule, CalendarModule, AutoCompleteModule,
    FormsModule, DropdownModule, ImageModule, FileUploadModule, CheckboxModule, CommonModule,ListboxModule],
  templateUrl: './market-sector.component.html',
  styleUrl: './market-sector.component.scss'
})
export class MarketSectorComponent {
  Caps: TreeNode[]
  filteredCountries: any[];
  GBSector: TreeNode[];
  CountryGroup = []
  Country = []
  CountrySelect = []
  Stockmarket=[]
  
  Currency = [];
  countryGroupID: number;
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
  active = [
    { name: "true" },
    { name: "false" },

  ];

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
    this.getMarketsInfo();

    this.filteredCountries = [
      { name: "GCC", code: 'GCC' },
      { name: "Europe", code: 'Europe' },
      { name: "Asia", code: 'Asia' },
      { name: "Americas", code: 'Americas' },
      { name: "The World<", code: 'The World<' },
    ]

    this.Caps = [
      {
        label: 'Large Caps'
      },
      {
        label: 'Med Caps'
      },
      {
        label: 'Micro Caps'
      }
      ,
      {
        label: 'Small Caps'
      }
    ]



  }
  getMarketsInfo() {
    this.marketSectorService.getMarketsInfoByMarketID(0).subscribe(res => {
      this.CountryGroup = res.countrygroup;
      this.Country = res.country;
      this.Currency=res.currency;
      this.Stockmarket=res.stockMarket

    });
  }
  getCountryByGroupId() {

    this.CountrySelect=null;
    this.CountrySelect = this.Country.filter(country => country.countryGroupID === this.countryGroupID);
  }
}
