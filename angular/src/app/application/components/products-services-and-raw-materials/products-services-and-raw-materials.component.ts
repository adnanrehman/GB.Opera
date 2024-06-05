import { Component } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';
@Component({
  selector: 'app-products-services-and-raw-materials',
  standalone: true,
  imports: [],
  templateUrl: './products-services-and-raw-materials.component.html',
  styleUrl: './products-services-and-raw-materials.component.scss'
})
export class ProductsServicesAndRawMaterialsComponent {
  constructor(private tabService: TabService) {}

  ngOnInit() {
    debugger;
    this.tabService.addTab({title:"Products Services And Raw Materials",component:ProductsServicesAndRawMaterialsComponent});
    this.tabService.tabs$.subscribe(tabs => {
      var tabs = tabs;
    });
  }
}
