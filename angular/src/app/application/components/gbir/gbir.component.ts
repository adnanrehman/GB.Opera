import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { Application_Gbir } from 'src/app/services/permissions';
@Component({
  selector: 'app-gbir',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule,CommonModule ],
  templateUrl: './gbir.component.html',
  styleUrl: './gbir.component.scss'
})
export class GbirComponent {
  filteredCountries: any[];
   
  data:TreeNode[];
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
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Application_Gbir + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_Gbir + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_Gbir + '.Delete')) {
      this.permission.delete = true;
    }
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ];

    this.data=[
      {
        label: 'MISC',
        children: [
          {label: 'No.  Of Employees',},
          {label: 'Weighted Shared',},
          {label: 'Treasury Shared',},
          {label: 'No. Of Branches',},
          {label: 'Np. Of Atms',},
          {label: 'OutStanding Shares',},
          {label: 'Breakdown',children:[{label:''}]},
          {label: 'Segment Analysis',children:[{label:''}]},
          {label: 'Geographical Analysis',children:[{label:''}]},
          {label: 'Market Risk',children:[{label:''}]},
          {label: 'Liquidity Risk',children:[{label:''}]},
          {label: 'Zakat-Saudi ShareHolders'},
          {label: 'Income Tax'},
         
        ]
      },
      {
        label: 'Capitol Adequery',
        children: [
          {label: 'Risk Weighted Assets',},
          {label: 'Capitol Required',},
          {label: 'Tier 1 Capitol',},
          {label: 'Tier 2 Capitol',},
          {label: 'Np. Of Atms',},
          {label: 'Total Tier 1 and 2 Capitol',},
          {label: 'Tier 1 capitol Adequery Ratio'},
          {label: 'Total capitol Adequery Ratio'},
         
        ]
      },
        
       ];

       
  }
}
