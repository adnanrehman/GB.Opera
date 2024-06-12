
import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { GbFactsAccountDetailComponent } from '../gb-facts/gb-facts-account-detail/gb-facts-account-detail.component';
import { OwnershipAccountDetailComponent } from './ownership-account-detail/ownership-account-detail.component';
@Component({
  selector: 'app-ownership',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './ownership.component.html',
  styleUrl: './ownership.component.scss'
})
export class OwnershipComponent {
  data: TreeNode[]; 
  ref!: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  ngOnInit() { 
    this.getData();
  }

  getData(){
    this.data = [ 
      { 
          label: 'GB OwnerShip', 
          children: [ 
              { 
                  label: 'Ownership', 
                  children: [ 
                      { 
                          label: 'Government', 
                          children:[
                            {
                              label: 'Suadia Arabia',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'UAE',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Iran',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Iraq',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Sudan',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Kuwait',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Libya',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                          ]
                      }, 
                      { 
                          label: 'Doubly List', 
                      }, 
                      { 
                          label: 'Circularly List', 
                      }, 
                  ], 
              }, 
              { 
                  label: 'Balance Sheet', 
                  children: [ 
                      { 
                          label: 'Assets', 
                          children: [ 
                            { 
                                label: 'Singly List', 
                            }, 
                            { 
                                label: 'Doubly List', 
                            }, 
                            { 
                                label: 'Circularly List', 
                            }, 
                        ], 
                      }, 
                      { 
                          label: 'Liabilities & ShareHolders Equility', 
                          children: [ 
                            { 
                                label: 'Singly List', 
                            }, 
                            { 
                                label: 'Doubly List', 
                            }, 
                            { 
                                label: 'Circularly List', 
                            }, 
                        ], 
                      }, 
                      {
                        label: 'Working Capitol', 
                      },
                      {
                        label: 'Net Unrealized gains on invenstement securities', 
                      },
                      {
                        label: 'Deffered Revenues (BS)', 
                      },
                      {
                        label: 'Fair Values reserve (BS)', 
                      },
                      {
                        label: 'Foreign exchange translation (BS)', 
                      },
                      {
                        label: 'Tier 1 sukuk', 
                      },
                      {
                        label: 'Sukuk eligible as additional capitol (SE) ', 
                      },
                  ], 
              }, 
          ], 
      }, 
  ]; 
  }

  addAccount() {
    this.ref = this.dialogService.open(OwnershipAccountDetailComponent, {
      header: 'Add Account',
      data: {
        obj: null
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
;
    });

  }

  editAccount(obj: any) {
    debugger
    this.ref = this.dialogService.open(OwnershipAccountDetailComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
    });
  }

}
