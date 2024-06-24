import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-companies-products-services-raw-materials-updates',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule ],
  templateUrl: './companies-products-services-raw-materials-updates.component.html',
  styleUrl: './companies-products-services-raw-materials-updates.component.scss'
})
export class CompaniesProductsServicesRawMaterialsUpdatesComponent {
  tree:TreeNode[];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
ngOnInit(){
  this.tree=[
    {
      label:'Products',
      children :[
        {
          label:'PolyProplyne',
        }
      ],
    },
    {
      label:'Services',
      children :[
        {
          label:'Financial Advisory',
        },
        {
          label:'Insurance',
          children:[
            {label:'individual Insurance',children:[{label:''}]},
            {label:'Corporate Insurance',children:[{label:''}]},
            {label:'XXXXXXXXXXX'},
            {label:'XXXXXXX'},
            {label:'XXXXX'},
          ]
        }
      ],
    },
    {
      label:'Raw Material',
      children :[
        {
          label:'Paraxylene',
        }
      ],
    },
  ]
}
}
