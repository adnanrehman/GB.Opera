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
import { Application_ProductsServicesAndRawMaterials } from 'src/app/services/permissions';
@Component({
  selector: 'app-products-services-and-raw-materials',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule,CommonModule ],
  templateUrl: './products-services-and-raw-materials.component.html',
  styleUrl: './products-services-and-raw-materials.component.scss'
})
export class ProductsServicesAndRawMaterialsComponent {
  data:TreeNode[];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(  private permissionService: PermissionService) {

    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
 
    
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Delete')) {
      this.permission.delete = true;
    }
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
