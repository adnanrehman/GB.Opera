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

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,CheckboxModule ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  filteredCountries: any[];
  companies: any[] = [ 
    { ticker: "AlAWWAL",aod:"03-31-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
    { ticker: "AlAWWAL",aod:"02-12-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
    { ticker: "AlAWWAL",aod:"02-15-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
    { ticker: "AlAWWAL",aod:"02-18-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
    { ticker: "AlAWWAL",aod:"01-22-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
    { ticker: "AlAWWAL",aod:"01-01-18",yr:"2018",pr:"Q1",eu:"Kashif",reu:"m sami",qp:"1" }, 
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  constructor( 
    private permissionService: PermissionService){
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
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_Upload + '.delete')) {
      this.permission.delete = true;
    }
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
  }

}
