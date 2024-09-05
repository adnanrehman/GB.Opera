import { PermissionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Company_Ipos } from 'src/app/services/permissions';

@Component({
  selector: 'app-ipos',
  standalone: true,
  imports: [],
  templateUrl: './ipos.component.html',
  styleUrl: './ipos.component.scss'
})
export class IposComponent {
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
  ngOninit()
  {
    if (this.permissionService.getGrantedPolicy(Company_Ipos + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Ipos + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Ipos + '.delete')) {
      this.permission.delete = true;
    }
  }
}
