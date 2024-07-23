import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ACFactsDtos, AccountClassificationService, GbAcFactsAccount } from '@proxy/accounts-classifications';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts-classifications-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accounts-classifications-detail.component.html',
  styleUrl: './accounts-classifications-detail.component.scss'
})
export class AccountsClassificationsDetailComponent {
  ref!: DynamicDialogRef;
  aacfactid :number
  account : GbAcFactsAccount ={
    acFactID :0,
    acFact :'',
    parentID : 0,
    aacFact :'',
    isACAccount :false,
    isTitle :false,
    gbFactID:0
    
   }
   constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,private accountClassificationService : AccountClassificationService) {
 
  }
  closeModal(): void {
    this.modalref.close();
  }
  ngOnInit() {
    debugger;
    if (this.config.data.obj,this.config.data.text) {
      var data = this.config.data.obj;
       
      if (this.config.data.text=="Edit Account")
        {
          debugger;
        
           this.account.acFactID= data.node.acFactId;
          this.aacfactid=this.account.acFactID;
           
           this.getaacfactByid(this.account.acFactID);
        }
        else
        {
          this.account.parentID= data.node.acFactId;
           
        }  
          
      
    }
  }

  getaacfactByid(acFactId: number) {
    this.accountClassificationService.getAacfactByidByACFactId(acFactId).subscribe({
      next: (response) => {
        this.account = response.find(item => item.acFactID === acFactId);
  
      },
      error: (err) => {
        console.error('Error fetching GbFactsAccount:', err);
      }
    });
  }
  deleteaacfactByid() {
    this.accountClassificationService.deleteAacfactByIdByACFactId(this.aacfactid).subscribe({
      next: (response) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'delete successfully', icon: 'success', });
        console.log('Save response:', response);
        this.closeModal();
  
      },
      error: (err) => {
        console.error('Error fetching GbFactsAccount:', err);
      }
    });
  }
  Cancel() {
    this.closeModal();
  }

  addAccounts() {
    this.accountClassificationService.saveUpdateAacFactByGbAcFactsAccount(this.account).subscribe({
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
}
