import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TreeSelectModule } from 'primeng/treeselect';
@Component({
  selector: 'app-accounts-classification',
  standalone: true,
  imports :[TreeSelectModule],
  templateUrl: './accounts-classification.component.html',
  styleUrl: './accounts-classification.component.scss'
})
export class AccountsClassificationComponent {
  
  data:TreeSelectModule[];
  constructor(private tabService: TabService,  private router: Router) {}

   ngOnInit() {
    
 this.data=[
{
  lable: 'Income Statement'
}

 ];

   }
}
