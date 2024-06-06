import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-gb-facts',
  standalone: true,
  imports: [],
  templateUrl: './gb-facts.component.html',
  styleUrl: './gb-facts.component.scss'
})
export class GbFactsComponent {

  constructor(private tabService: TabService,  private router: Router) {}

  // ngOnInit() {
  //   debugger;
  //   this.tabService.addTab({title:"Gb Facts",component:GbFactsComponent});
  //   this.tabService.tabs$.subscribe(tabs => {
  //     var tabs = tabs;
  //   });
  //   this.router.navigate([`/application/app`]);
  // }
}
