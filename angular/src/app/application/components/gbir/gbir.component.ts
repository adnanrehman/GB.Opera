import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-gbir',
  standalone: true,
  imports: [],
  templateUrl: './gbir.component.html',
  styleUrl: './gbir.component.scss'
})
export class GbirComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"GBIR",component:GbirComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
