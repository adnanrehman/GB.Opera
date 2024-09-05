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
import { News_Gulfbase } from 'src/app/services/permissions';

@Component({
  selector: 'app-gulfbase',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './gulfbase.component.html',
  styleUrl: './gulfbase.component.scss'
})
export class GulfbaseComponent {
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  sector = [ 
    { name: "Bank" }, 
    { name: "Consumer" }, 
    { name: "Energy" }, 
    { name: "Services" }, 
    { name: "Real State" }, 
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
    if (this.permissionService.getGrantedPolicy(News_Gulfbase + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Gulfbase + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Gulfbase + '.delete')) {
      this.permission.delete = true;
    }
     
  }

}
