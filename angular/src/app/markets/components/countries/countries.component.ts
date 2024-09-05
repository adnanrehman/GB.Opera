import { PermissionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CompanyAndMarket_Country } from 'src/app/services/permissions';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {

  GbName = [ 
    { name: "Americas" }, 
    { name: "Asia" }, 
    { name: "GCC" },
    { name: "New Group" },
    { name: "The World" },
     
  ];

  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  IndicatorType = [ 
    { name: "Actual" }, 
    { name: "Estimated" }, 
    { name: "Forcasted" },
    
  ];

  ValueIn = [ 
    { name: "$" }, 
    { name: "%" }, 
    { name: "Billion" },
    { name: "PKR" },
    
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( private permissionService: PermissionService) {

    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }
  ngOnInit() {

    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.delete')) {
      this.permission.delete = true;
    }
  }
  
}
