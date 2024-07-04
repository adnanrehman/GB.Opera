import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
//import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { TabService } from 'src/app/tab/tab.service';
@Component({
  selector: 'app-accounts-classification',
  standalone: true,
  //imports :[TreeSelectModule],
  imports: [TreeModule],
  templateUrl: './accounts-classification.component.html',
  styleUrl: './accounts-classification.component.scss'
})
export class AccountsClassificationComponent {
  
 // data:TreeSelectModule[];
 tree:TreeNode[];
 data:TreeNode[];
  constructor(private tabService: TabService,  private router: Router) {}

   ngOnInit() {
    
 this.data=[
{
  label: 'Income Statement',
  children: [
    {
      label: 'Special Commission Income',
      children:
      [
        {
          label:'Commission agent',
        },
        {
          label:'Income Tax Commission',
        },
        {
          label:'Withholding Tax Commission',
        }
  
      ]
      
    }
   
  ]
},
  {
    label:'Special Commission Expense',
  },
  {
    label:'Net Commission Income',
  },
  {
    label:'Other Operating Comission',
  },
  {
    label:'Total Operating Income',
    children: [
      {
        label:'Retail',
      },
      {
        label:'Corporate',
      },
      {
        label:'Investment & Brokerage',
      },
    ]
  },
  {
    label :'Gen Admin Expense',
    children:
    [
      {
        label:'Admin Expense',
      },
      {
        label:'Admin Officials',
      },
      {
        label:'Admin office',
      },
    ]
  },
  {
    label :'Depreciation & Amortization',
    children:
    [
      {
        label:'Depreciation',


      },
       
      {
        label:'Amortization',
      },
      {
        label:'Fix Assets Depreciation',
        children:
       [
        {
          label:'Depreciation of Vehicle',
        },
        {
          label:'Depreciation of Electronics',
        },
       ]
      }

    ]
  }

  
 ]
this.tree=[
  {
    label:'Accounts Classificaion',
    children :[
      {
        label:'Revenues',
        children:[
          {
            label:'Total Operating Income',
          },
          {
            label:'Sales',
          },
          {
            label:'Revenues',
          },
          {
            label:'Gross Premiums',
          },

        ]
      }
    ],
    

  },
  {
    label:'Total Debts',
    children:
    [
      {
        label:'Short Terms Loan',
      },
      {
        label:'Current Portion of long term debts',
      },
      {
        label:'Short term borrowing',
      },{
        label:'Short term borrowing',
      },
      {
        label:'Long Term Debts',
      },
    ]
  },
  {
    label: 'Cost Of Sales',
    children:[
      {
        label:'Cost Of Sales',
      },
      {
        label:'Operating Costs',
      },
      
    ]
  },
  {
    label: 'Special Commission/Interest Income',
    children:[
      {
        label:'Special Commission Income',
      },
      {
        label:'Interest Income',
      },
      {
        label:'Income from investment',
      }

    ]
  },
  {
    label:'Net Special Commission/Interest Income',
    
  },
  {
    label:'Short Terms Debts',
    
  }
]

} 

}

 
