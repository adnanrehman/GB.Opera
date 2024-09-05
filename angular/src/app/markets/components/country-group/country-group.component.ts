import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { CompanyAndMarket_CountryGroup } from 'src/app/services/permissions';
@Component({
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, FormsModule,DropdownModule,ImageModule,FileUploadModule,CheckboxModule],
  selector: 'app-country-group',
  standalone: true,
  
  templateUrl: './country-group.component.html',
  styleUrl: './country-group.component.scss'
})
export class CountryGroupComponent {
  Caps:TreeNode[]
  filteredCountries: any[];
  GBSector:TreeNode[]
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
      private permissionService: PermissionService) {
        this.permission = {
          create: false,
          edit : false,
          delete  :false
        }
    
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.delete')) {
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
    this.GBSector=[
      {
        label: 'Agriculture & Food Industries'
      },
      {
        label: 'Banking'
      },
      {
        label: 'Banking & Financial'
      }
      ,
      {
        label: 'Banking & Investment'
      }
      ,
      {
        label: 'Banks'
      }
      ,
      {
        label: 'Bank  & Financial Service'
      }
      ,
      {
        label: 'Basic Metrial '
      }
      ,
      {
        label: 'Building & Construction'
      }
      ,
      {
        label: 'Capital Goods'
      }
      ,
      {
        label: 'Cement'
      }
      ,
      {
        label: 'Commercial Bank'
      }
      ,
      {
        label: 'Commercial Banks'
      }
    ]
  }
}
