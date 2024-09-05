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
import { CompanyAndMarket_CountryProfile } from 'src/app/services/permissions';

@Component({
  selector: 'app-country-profile',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule,
     FormsModule,DropdownModule,ImageModule,FileUploadModule,TabViewModule,CommonModule],
  templateUrl: './country-profile.component.html',
  styleUrl: './country-profile.component.scss'
})
export class CountryProfileComponent {
  tree:TreeNode[];
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
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Eit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryProfile + '.Delete')) {
      this.permission.delete = true;
    }
    this.tree = [
      {
        label: 'Country Profile',
        children: [
          {
            label: 'Bahrain',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          },
          {
            label: 'AMR',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          },
          {
            label: 'Saudia',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          }
        ]
      }
    ];
  }

}
