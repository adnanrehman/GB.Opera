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

@Component({
  selector: 'app-market-sector',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, FormsModule,DropdownModule,ImageModule,FileUploadModule,CheckboxModule ],
  templateUrl: './market-sector.component.html',
  styleUrl: './market-sector.component.scss'
})
export class MarketSectorComponent {
  Caps:TreeNode[]
  filteredCountries: any[];
  GBSector:TreeNode[];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(  private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
  
  }
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  GbName = [ 
    { name: "Americas" }, 
    { name: "Asia" }, 
    { name: "GCC" },
    { name: "New Group" },
    { name: "The World" },
     
  ];
  Country = [ 
    { name: "Kingdom of Saudi Arabia" }, 
    { name: "State of Kuwait" }, 
    { name: "State of Qatar" },
    { name: "State of Oman" },
    
     
  ];
  Currency = [ 
    { name: "SAR" }, 
    { name: "USD" }, 
    { name: "AED" },
    { name: "QAR" },
    
     
  ];
  ngOnInit() {

    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_MarketSector + '.delete')) {
      this.permission.delete = true;
    }

    this.filteredCountries = [
      {name: "GCC",code:'GCC'},
      {name: "Europe",code:'Europe'},
      {name: "Asia",code:'Asia'},
      {name: "Americas",code:'Americas'},
      {name: "The World<",code:'The World<'},
    ]

    this.Caps=[
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
  
}
