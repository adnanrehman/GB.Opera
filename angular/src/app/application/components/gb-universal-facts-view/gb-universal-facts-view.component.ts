import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Application_GbUniversalFacts } from 'src/app/services/permissions';
@Component({
  selector: 'app-gb-universal-facts-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gb-universal-facts-view.component.html',
  styleUrl: './gb-universal-facts-view.component.scss'
})
export class GbUniversalFactsViewComponent {
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
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbUniversalFacts + '.Delete')) {
      this.permission.delete = true;
    }
  }
}
