import { PermissionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Application_Reports } from 'src/app/services/permissions';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  
})
export class ReportsComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
     constructor(private permissionService: PermissionService){
       {
        this.permission = {
          create: false,
          edit : false,
          delete  :false
        }
   
  }
  
}
ngOnInit() {
  if (this.permissionService.getGrantedPolicy(Application_Reports + '.Create')) {
    this.permission.create = true;
  }
  if (this.permissionService.getGrantedPolicy(Application_Reports + '.edit')) {
    this.permission.edit = true;
  }
  if (this.permissionService.getGrantedPolicy(Application_Reports + '.delete')) {
    this.permission.delete = true;
  }
}
}
 