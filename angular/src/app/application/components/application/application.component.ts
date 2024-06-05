import { AuthService } from '@abp/ng.core';
import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TabService } from '@proxy/tab/tab.service';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [NgFor],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {

  tabs: any[] = [];
  selectedIndex = 0;

  @ViewChild('tabContainer', { read: ViewContainerRef }) tabContainer!: ViewContainerRef;

  constructor(private authService: AuthService,private tabService: TabService, private cfr: ComponentFactoryResolver) {}

  ngOnInit() {
    debugger;
    this.tabService.tabs$.subscribe(tabs => {
      this.tabs = tabs;
      this.loadTabComponent();
    });
  }

  addTab(title: string, component: any) {
    this.tabService.addTab({ title, component });
  }

  selectTab(index: number) {
    this.selectedIndex = index;
    this.loadTabComponent();
  }

  closeTab(index: number, event: Event) {
    event.stopPropagation();
    this.tabService.removeTab(index);
    if (this.selectedIndex === index && this.tabs.length > 0) {
      this.selectedIndex = Math.max(0, index - 1);
    }
    this.loadTabComponent();
  }

  async loadTabComponent() {
    debugger;
    if (this.tabs.length > 0) {
      this.tabContainer.clear();
      const component = this.tabs[this.selectedIndex].component;
      const factory = this.cfr.resolveComponentFactory(component);
      this.tabContainer.createComponent(factory);
    }
  }

}
