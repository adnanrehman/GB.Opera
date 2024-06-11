import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GbFactsAccountDetailComponent } from './gb-facts-account-detail/gb-facts-account-detail.component';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'app-gb-facts',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './gb-facts.component.html',
  styleUrl: './gb-facts.component.scss'
})
export class GbFactsComponent {

  data: TreeNode[]; 
  cols: any[];
  ref!: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  ngOnInit() { 
    this.cols = [ 
        { field: 'name', header: 'First Name' }, 
        { field: 'age', header: 'Age' }, 
    ]; 
    this.data = [ 
        { 
            label: 'Gb Accounts', 
            children: [ 
                { 
                    label: 'Income Statement', 
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
        { 
            label: 'Cash Flow', 
            children: [ 
                { 
                    label: 'Greedy ', 
                }, 
                { 
                    label: 'BFS ', 
                }, 
                { 
                    label: 'Dynamic Programming', 
                }, 
            ], 
        }, 
        { 
          label: 'MISC', 
          children: [ 
              { 
                  label: 'Greedy ', 
              }, 
              { 
                  label: 'BFS ', 
              }, 
              { 
                  label: 'Dynamic Programming', 
              }, 
          ], 
        }, 
        { 
          label: 'Capitol Adequacy', 
          children: [ 
              { 
                  label: 'Greedy ', 
              }, 
              { 
                  label: 'BFS ', 
              }, 
              { 
                  label: 'Dynamic Programming',
              }, 
          ], 
        }, 
        { 
          label: 'General Ratios', 
          children: [ 
              { 
                  label: 'Greedy ', 
              }, 
              { 
                  label: 'BFS ', 
              }, 
              { 
                  label: 'Dynamic Programming',
              }, 
          ], 
        }, 
    ]; 
  }

  addAccount() {
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Add Account',
      data: {
        obj: null
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      // this.getAll({});
    });

  }

  editHeader(obj: any) {
    debugger
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      // this.getAll({});
    });
  }



}
