import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ownership-account-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ownership-account-detail.component.html',
  styleUrl: './ownership-account-detail.component.scss'
})
export class OwnershipAccountDetailComponent {
  account!: any;
  ref!: DynamicDialogRef;
  constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,) {
    this.account = {};
  }

  ngOnInit() {
    if (this.config.data.obj) {
      var data = this.config.data.obj;
      this.account.accountName = data.node.label;
    }
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
