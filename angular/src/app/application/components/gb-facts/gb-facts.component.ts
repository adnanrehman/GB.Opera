import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';

@Component({
  selector: 'app-gb-facts',
  standalone: true,
  imports: [],
  templateUrl: './gb-facts.component.html',
  styleUrl: './gb-facts.component.scss'
})
export class GbFactsComponent {

  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"Gb Facts",component:GbFactsComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
