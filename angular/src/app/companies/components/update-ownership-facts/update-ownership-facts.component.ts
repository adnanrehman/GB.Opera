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
  selector: 'app-update-ownership-facts',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule ],
  templateUrl: './update-ownership-facts.component.html',
  styleUrl: './update-ownership-facts.component.scss'
})
export class UpdateOwnershipFactsComponent {
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
      label:'Ownership',
      children :[
        {
          label:'Company Products Services and Rating',
        }
      ],
    }
  ]
}
}
