import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { Financial_EnhancedRatios } from 'src/app/services/permissions';

@Component({
  selector: 'app-enhanced-ratios',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, FormsModule,
    DropdownModule,ImageModule,FileUploadModule,TabViewModule,CommonModule],
  templateUrl: './enhanced-ratios.component.html',
  styleUrl: './enhanced-ratios.component.scss'
})
export class EnhancedRatiosComponent {
  dividends: any[] = [ 
    { company:  "AABR",ye:"P/E",est:"AABR",order:"Ending December 2017  ..."  }, 
    { company:  "AABR",ye:"Price/Revenue",est:"EAABR",order:"Ending December 2017  ..."  }, 
    { company:  "ADIB",ye:"Price/BookValue",est:"AABR",order:"Ending December 2017  ..."  }, 
    { company:  "AFNIC",ye:"Price/CashFlow",est:"AABR",order:"Ending December 2017  ..."  }, 
  ];
  markets = [ 
    { name: "Sector" }, 
    { name: "Company" }, 
    { name: "Gulfbase" },
    { name: "Stock Markets" },
     
     
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_EnhancedRatios + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_EnhancedRatios + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_EnhancedRatios + '.Delete')) {
      this.permission.delete = true;
    }
  }
}
