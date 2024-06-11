import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gb-facts-account-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gb-facts-account-detail.component.html',
  styleUrl: './gb-facts-account-detail.component.scss'
})
export class GbFactsAccountDetailComponent {
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
}
