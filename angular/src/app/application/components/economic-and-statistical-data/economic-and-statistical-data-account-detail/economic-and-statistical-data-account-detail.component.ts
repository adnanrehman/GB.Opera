import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ESDFactDto } from '@proxy/commons';
import { EconomicAndStateFactService, ESDFactModel } from '@proxy/economic-and-state-facts';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-economic-and-statistical-data-account-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './economic-and-statistical-data-account-detail.component.html',
  styleUrl: './economic-and-statistical-data-account-detail.component.scss',
})
export class EconomicAndStatisticalDataAccountDetailComponent {
  account!: any;
  esdFactMapping: ESDFactDto = {
    esdFactID: 0,
    parentID: 0,
  };
  esdFact: ESDFactModel = {
    esdFactID: 0,
    isTitle: false,
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: false,
    yearly: false,
    forcast: false,
    parentID: 0,
    rootParentESDFactID:0
    
  };
  ref!: DynamicDialogRef;
  constructor(
    private modalref: DynamicDialogRef,
    private economicAndStateFactService: EconomicAndStateFactService,
    public config: DynamicDialogConfig
  ) {
    this.account = {};
  }

  ngOnInit() {
    debugger;
    if ((this.config.data.obj, this.config.data.text)) {
      var data = this.config.data.obj;

      if (this.config.data.text == 'Edit ESD Facts') {
        debugger;

        this.esdFact.esdFactID = data.node.esdFactID;
        this.esdFactMapping = data.node;data.node.esdFactID
        this.esdFact.rootParentESDFactID = data.rootparentId || data.node.esdFactID;


         
        this.getESDFactbyIdByESDFactID(this.esdFactMapping.esdFactID);
      } else {
        //this.esdFact.parentID =0
         this.esdFact.parentID =data.node.esdFactID
         ;
      if (data.rootparentId===0 || data.rootparentId === undefined || data.rootparentId === null )
      {
        this.esdFact.rootParentESDFactID = data.node.esdFactID
      }
      else{
        this.esdFact.rootParentESDFactID = data.rootparentId  
      }
        
      }
    }
  }

  closeModal(): void {
    this.modalref.close("close");
  }

  Cancel() {
    this.closeModal();
  }

  saveUpdateESDFact() {
    debugger;
    this.economicAndStateFactService.saveUpdateESDFactByInput(this.esdFact).subscribe({
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
        this.closeModal();
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
        this.closeModal();
        // alert("Save error: " + err.message); // Display error message to user
      },
    });
  }

  deletESDFactByIdByESDFactID() {
    this.economicAndStateFactService.deletESDFactByIdByESDFactID(this.esdFact.esdFactID).subscribe({
      next: response => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'delete successfully',
          icon: 'success',
        });
        console.log('Save response:', response);
        this.closeModal();
      },
      error: err => {
        console.error('Error fetching GBOwnerShip:', err);
      },
    });
  }

  getESDFactbyIdByESDFactID(esdFactId: number) {
    this.economicAndStateFactService.getESDFactbyIdByESDFactID(esdFactId).subscribe({
      next: response => {
        debugger;
        this.esdFact = response[0];
        this.esdFact.esdFactID = esdFactId;
        this.esdFact.parentID = this.esdFactMapping.parentID;
      },
      error: err => {
        console.error('Error fetching GbFactsAccount:', err);
      },
    });
  }

  deleteAccount() {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        this.closeModal();
      }
    });
  }
}
