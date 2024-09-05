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
import { RadioButtonModule } from 'primeng/radiobutton';
import { PermissionService } from '@abp/ng.core';
import { Financial_ReEntry } from 'src/app/services/permissions';

@Component({
  selector: 'app-re-entry',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,CheckboxModule,RadioButtonModule ],
  templateUrl: './re-entry.component.html',
  styleUrl: './re-entry.component.scss'
})
export class ReEntryComponent {

  filteredCountries: any[];
  ingredient:any;
  data:any[] = [];
  companies: any[] = [ 
    { company: "Income Statement" },
    { company: "Reveneues", value:"15,599.0000" },
    { company: "Operating Cost" },
    { company: "Gross Profit" },
    { company: "Investment Income (Loss)" , value:"15,599.0000" },
    { company: "Share of results of associates", value:"15,362.0000" },
    { company: "General and administrator expected", value:"237.0000"  },
    { company: "Depreciation of property" },
    { company: "Provision for impairment" },
    { company: "Prof of doubtfull Debts" },
    { company: "Net Profit loss from operations", value:"9,566.0000" },
    { company: "Operating Income", value:"9,566.0000" },
    { company: "other income - profit", value:"324.0000" },
    { company: "other provisions" },
    { company: "other Expenses" },
    { company: "Depreciations & Amortions", value:"324.0000" },
    { company: "Other Income", value:"9,568.0000" },
    { company: "Provisions" },
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
    if (this.permissionService.getGrantedPolicy(Financial_ReEntry + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_ReEntry + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_ReEntry + '.delete')) {
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
