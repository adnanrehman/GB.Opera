import { PermissionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Application_GbUniversalFacts } from 'src/app/services/permissions';
@Component({
  selector: 'app-gb-universal-facts',
  standalone: true,
  imports: [],
  templateUrl: './gb-universal-facts.component.html',
  styleUrl: './gb-universal-facts.component.scss'
})
export class GbUniversalFactsComponent {

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
  ngoninit()
  {
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.delete')) {
      this.permission.delete = true;
    }
  }
}
