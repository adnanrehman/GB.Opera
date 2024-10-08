import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api/treenode';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { CompanyAndMarket_CountryProfile } from 'src/app/services/permissions';

@Component({
  selector: 'app-country-profile-admin',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule,
     FormsModule,DropdownModule,ImageModule,FileUploadModule,TabViewModule,CommonModule],
  templateUrl: './country-profile-admin.component.html',
  styleUrl: './country-profile-admin.component.scss'
})
export class CountryProfileAdminComponent {
  tree:TreeNode[];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
  
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Delete')) {
      this.permission.delete = true;
    }
    this.tree=[
      {
        label:'Section Facts',
        children :[
          {
            label:'Revenues',
            children:[
              {
                label:'Total Operating Income',
              },
              {
                label:'Sales',
              },
              {
                label:'Revenues',
              },
              {
                label:'Gross Premiums',
              },
    
            ]
          }
        ],
        
    
      },
       
      {
        label: 'Cost Of Sales',
        children:[
          {
            label:'Cost Of Sales',
          },
          {
            label:'Operating Costs',
          },
          
        ]
      },
       
      {
        label:'Short Terms Debts',
        
      }
    ]
  }
}
