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
import { News_Market } from 'src/app/services/permissions';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent {
   
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  Language = [ 
    { name: "English" }, 
    { name: "Arabic" }, 
     
  ];
  companies: any[] = [ 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
  ];
  constructor(private permissionService: PermissionService)
  {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }
 
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(News_Market + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Market + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Market + '.delete')) {
      this.permission.delete = true;
    }
     
  }
}
