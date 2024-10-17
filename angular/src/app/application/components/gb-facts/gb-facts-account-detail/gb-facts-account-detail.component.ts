import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GbFactsAccount } from '@proxy/gb-facts/models';
import { GbFactService } from '@proxy/gb-facts/gb-fact.service';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Application_GbFacts } from 'src/app/services/permissions';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-gb-facts-account-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './gb-facts-account-detail.component.html',
  styleUrl: './gb-facts-account-detail.component.scss'
  
})
export class GbFactsAccountDetailComponent {
 
  ref!: DynamicDialogRef;

  account : GbFactsAccount ={
    gbFactID :0,
    gbFact :'',
    parentID : 0,
    agbFact :'',
    isGBAccount:false,
    isTitle:false
    
   }
   permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,private gnfactservice: GbFactService, private permissionService: PermissionService) {
      this.permission = {
        create: false,
        edit : false,
        delete  :false
      }
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
    if (this.config.data.obj,this.config.data.text) {
      var data = this.config.data.obj;
       
      if (this.config.data.text=="Edit Account")
        {
        
          this.account.gbFactID= data.node.gbFactID;
          
           
           this.getgbfactByid(data.node.gbFactID);
        }
        else
        {
          this.account.parentID= data.node.gbFactID;
           
        }  
          
      
    }
  }

  closeModal(): void {
    this.modalref.close();
  }

  Cancel() {
    this.closeModal();
  }
  getgbfactByid(gbFactID: number) {
    this.gnfactservice.getgbfactByidByGBFactID(gbFactID).subscribe({
      next: (response) => {
        this.account = response.find(item => item.gbFactID === gbFactID);
  
      },
      error: (err) => {
        console.error('Error fetching GbFactsAccount:', err);
      }
    });
  }
  
  addAccounts() {
    this.gnfactservice.saveUpdateByGbFact(this.account).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);
        this.closeModal();
      },
      error: (err) => {
        
        console.error("Error While Saveing", err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          title: 'Error!',
          text: "Error While Saveing",
          icon: 'error'
        });
       // alert("Save error: " + err.message); // Display error message to user
      }
    });
  }


  
}
