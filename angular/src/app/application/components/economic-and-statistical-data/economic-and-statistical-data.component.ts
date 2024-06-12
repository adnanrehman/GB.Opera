
import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { EconomicAndStatisticalDataAccountDetailComponent } from './economic-and-statistical-data-account-detail/economic-and-statistical-data-account-detail.component';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-economic-and-statistical-data',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './economic-and-statistical-data.component.html',
  styleUrl: './economic-and-statistical-data.component.scss'
})
export class EconomicAndStatisticalDataComponent {
  data: TreeNode[]; 
  ref!: DynamicDialogRef;
  constructor(private dialogService: DialogService) {}

  ngOnInit() { 
    this.getData();
  }

  getData(){
    this.data = [ 
      { 
          label: 'Economic and Statistical Facts', 
          children: [ 
              { 
                  label: 'KSA', 
                  children: [ 
                      { 
                          label: 'Living Indexes', 
                          children:[
                            {
                              label: 'Cost Of Living Index',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Whole Sale Price Index',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Infleunce',
                              children: 
                              [
                                {
                                  label:'Author'
                                }
                              ]
                            },
                            {
                              label: 'Real Price Index',
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
                          label: 'Money', 
                          children:[]
                      }, 
                      { 
                          label: 'Public Finance Statistics', 
                          children:[]
                      }, 
                      { 
                        label: 'Investment Funds', 
                        children:[]
                    }, 
                    { 
                      label: 'Government Specialized Credit Instituation', 
                      children:[]
                  }, 

                  { 
                    label: 'Foriegn Trade Statistics', 
                    children:[]
                }, 
                { 
                  label: 'National Account Statistics', 
                  children:[]
              }, 
              { 
                label: 'Oil Statistics', 
                children:[]
            }, 
            { 
              label: 'Populations', 
              children:[]
          }, 
          { 
            label: 'Employement', 
            children:[]
        }, 
        { 
          label: 'Aviation Operations', 
          children:[]
      }, 
      { 
        label: 'Electricity and water', 
        children:[]
    }, 
    { 
      label: 'Agriculture livestock', 
      children:[]
  }, 


                  ], 
              }, 
              { 
                  label: 'UAE', 
                  children: [], 
              }, 
              { 
                label: 'KSE', 
                children: [], 
            }, 
            { 
              label: 'BH', 
              children: [], 
          }, 
          { 
            label: 'OM', 
            children: [], 
        }, 
        { 
          label: 'QTR', 
          children: [], 
      }, 

      { 
        label: 'UK', 
        children: [], 
    }, 
    { 
      label: 'GR', 
      children: [], 
  }, 
  { 
    label: 'FR', 
    children: [], 
}, 
{ 
  label: 'USA', 
  children: [], 
}, 
          ], 
      }, 
  ]; 
  }

  addAccount() {
    this.ref = this.dialogService.open(EconomicAndStatisticalDataAccountDetailComponent, {
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
    this.ref = this.dialogService.open(EconomicAndStatisticalDataAccountDetailComponent, {
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
