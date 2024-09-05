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
import { Financial_CompQnetP } from 'src/app/services/permissions';
 
@Component({
  selector: 'app-comp-qnet-p',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,CheckboxModule ],
  templateUrl: './comp-qnet-p.component.html',
  styleUrl: './comp-qnet-p.component.scss'
})
export class CompQnetPComponent {

  filteredCountries: any[];
  companies: any[] = [ 
    { ticker: "AlAWWAL",aod:"03-31-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"1 month" }, 
    { ticker: "AlAWWAL",aod:"02-12-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"9 month" }, 
    { ticker: "AlAWWAL",aod:"02-15-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"6 month" }, 
    { ticker: "AlAWWAL",aod:"02-18-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"8 month" }, 
    { ticker: "AlAWWAL",aod:"01-22-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"2 month" }, 
    { ticker: "AlAWWAL",aod:"01-01-18",yr:"2018",pr:"Q1",eu:"5161616.36",reu:"m sami",qp:"3 month" }, 
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
  constructor( 
    private permissionService: PermissionService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.delete')) {
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
