import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-accounts-classification',
  standalone: true,
  imports: [],
  templateUrl: './accounts-classification.component.html',
  styleUrl: './accounts-classification.component.scss'
})
export class AccountsClassificationComponent {
  constructor(private tabService: TabService,  private router: Router) {}

  // ngOnInit() {
  //   debugger;
  //   this.tabService.addTab({title:"Accounts Classification",component:AccountsClassificationComponent});
  //   this.tabService.tabs$.subscribe(tabs => {
  //     var tabs = tabs;
  //   });
  //   this.router.navigate([`/application/app`]);
  // }
}
