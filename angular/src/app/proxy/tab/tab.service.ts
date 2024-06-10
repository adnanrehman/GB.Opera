import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService, Rest } from '@abp/ng.core';

interface Tab {
  href: string;
  title: string;
  index: number;
  component: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {
  
  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  tabs$ = this.tabsSubject.asObservable();

  addTab(tab: Tab) {
    const tabs = this.tabsSubject.getValue();
    tabs.push(tab);
    this.tabsSubject.next(tabs);
  }

  removeTab(index: number) {
    const tabs = this.tabsSubject.getValue();
    tabs.splice(index, 1);
    this.tabsSubject.next(tabs);
  }
}