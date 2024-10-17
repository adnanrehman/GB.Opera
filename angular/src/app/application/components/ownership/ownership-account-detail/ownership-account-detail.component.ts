import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GbOwnerShips } from '@proxy';
import { GbOwnerShip, GbOwnerShipService } from '@proxy/gb-owner-ships';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Application_Ownership } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ownership-account-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ownership-account-detail.component.html',
  styleUrl: './ownership-account-detail.component.scss'
})
export class OwnershipAccountDetailComponent {
  permission: {
    create:boolean;
    edit:boolean,
    delete:boolean
  }
  ref!: DynamicDialogRef;
  constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,private gbOwnerShipService : GbOwnerShipService, private permissionService: PermissionService) {
      this.permission = {
        create: false,
        edit : false,
        delete  :false
      }
  }
  agbOwnerShip? :number
  gbOwnerShip : GbOwnerShip ={
    gbOwnershipID :0,
    parentID :0,
    gbOwnership :'',
    agbOwnership :'',
    isGBOwnership :false,
    isTitle :false,
    
    
   }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Application_Ownership + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_Ownership + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_Ownership + '.Delete')) {
      this.permission.delete = true;
    }
    if (this.config.data.obj,this.config.data.text) {
      var data = this.config.data.obj;
       
      if (this.config.data.text=="Edit Account")
        {
          debugger;
        
           this.gbOwnerShip.gbOwnershipID= data.node.gbOwnershipID;
          this.agbOwnerShip=this.gbOwnerShip.gbOwnershipID;
           
           
            this.getaacgbownerByid(this.gbOwnerShip.gbOwnershipID);
        }
        else
        {
          this.gbOwnerShip.parentID= data.node.gbOwnershipID;
           
        }  
          
      
    }
  }

  deletegbOwnerShipByid() {
    this.gbOwnerShipService.deletGBOwnershipByIdByGBOwnershipID(this.agbOwnerShip).subscribe({
      next: (response) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'delete successfully', icon: 'success', });
        console.log('Save response:', response);
        this.closeModal();
  
      },
      error: (err) => {
        console.error('Error fetching GBOwnerShip:', err);
      }
    });
  }

  addAccounts() {
    this.gbOwnerShipService.saveUpdateGbOwnerShipByGbOwnerShip(this.gbOwnerShip).subscribe({
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
        this.closeModal();
       // alert("Save error: " + err.message); // Display error message to user
      }
    });
  }

  getaacgbownerByid(gbOwnershipID: number) {
    this.gbOwnerShipService.getGBOwnershipbyIdByGBOwnershipID(gbOwnershipID).subscribe({
      next: (response) => {
        this.gbOwnerShip = response.find(item => item.gbOwnershipID === gbOwnershipID);
  
      },
      error: (err) => {
        console.error('Error fetching GbFactsAccount:', err);
      }
    });
  }

  closeModal(): void {
    this.modalref.close();
  }

  Cancel() {
    this.closeModal();
  }

  deleteAccount(){
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Account?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.closeModal();
      }
    })
  }
}
