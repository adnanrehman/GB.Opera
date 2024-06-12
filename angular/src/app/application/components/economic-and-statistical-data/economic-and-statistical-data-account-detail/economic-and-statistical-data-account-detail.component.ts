import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-economic-and-statistical-data-account-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './economic-and-statistical-data-account-detail.component.html',
  styleUrl: './economic-and-statistical-data-account-detail.component.scss'
})
export class EconomicAndStatisticalDataAccountDetailComponent {
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
