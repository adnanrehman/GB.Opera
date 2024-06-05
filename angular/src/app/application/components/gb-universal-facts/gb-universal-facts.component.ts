import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-gb-universal-facts',
  standalone: true,
  imports: [],
  templateUrl: './gb-universal-facts.component.html',
  styleUrl: './gb-universal-facts.component.scss'
})
export class GbUniversalFactsComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"Gb Universal Facts",component:GbUniversalFactsComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
