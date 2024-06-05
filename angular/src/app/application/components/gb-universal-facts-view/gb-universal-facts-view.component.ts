import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-gb-universal-facts-view',
  standalone: true,
  imports: [],
  templateUrl: './gb-universal-facts-view.component.html',
  styleUrl: './gb-universal-facts-view.component.scss'
})
export class GbUniversalFactsViewComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"Gb Universal Facts View",component:GbUniversalFactsViewComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
