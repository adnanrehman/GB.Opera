import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-lhsc-upload',
  standalone: true,
  imports: [],
  templateUrl: './lhsc-upload.component.html',
  styleUrl: './lhsc-upload.component.scss'
})
export class LhscUploadComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"LHSC Upload",component:LhscUploadComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
