import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-economic-and-statistical-data',
  standalone: true,
  imports: [],
  templateUrl: './economic-and-statistical-data.component.html',
  styleUrl: './economic-and-statistical-data.component.scss'
})
export class EconomicAndStatisticalDataComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"Economic And Statistical Data",component:EconomicAndStatisticalDataComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
