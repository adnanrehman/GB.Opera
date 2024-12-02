import { PermissionService } from '@abp/ng.core';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GbFactsAccount, GbFactService } from '@proxy/gb-facts';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Application_GbFacts } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rename-account',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './rename-account.component.html',
  styleUrl: './rename-account.component.scss'
})
export class RenameAccountComponent {
  ref!: DynamicDialogRef;
  companyID: number = 0;
  label:string;
  account: GbFactsAccount = {
    gbFactID: 0,
    gbFact: '',
    parentID: 0,
    agbFact: '',
    isGBAccount: false,
    isTitle: false,
  };
  permission: {
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private gnfactservice: GbFactService,
    private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false,
    };
  }

  ngOnInit() {
    debugger;
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.Delete')) {
      this.permission.delete = true;
    }
    debugger;
    if ((this.config.data.obj, this.config.data.text)) {
      var data = this.config.data.obj;
      this.label = data.node.label;
      this.companyID = this.config.data.companyID;
      this.getgbfactByid(data.node.gbFactID);
    }
  }

  Cancel() {
    this.modalref.close(false);
  }
  getgbfactByid(gbFactID: number) {
    this.gnfactservice.getgbfactByidByGBFactID(gbFactID).subscribe({
      next: response => {
        this.account = response.find(item => item.gbFactID === gbFactID);
        this.account.gbFact = this.label;
      },
      error: err => {
        console.error('Error fetching GbFactsAccount:', err);
      },
    });
  }

  addAccounts() {
    this.gnfactservice.renameFactByMenuByGbFactAndCompanyID(this.account,this.companyID).subscribe({
      next: res => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'Save successfully',
          icon: 'success',
        });
        console.log('Save response:', res);
        this.modalref.close(true);
      },
      error: err => {
        console.error('Error While Saveing', err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          title: 'Error!',
          text: 'Error While Saveing',
          icon: 'error',
        });
        // alert("Save error: " + err.message); // Display error message to user
      },
    });
  }
}