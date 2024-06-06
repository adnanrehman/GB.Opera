import { eThemeBasicComponents } from '@abp/ng.theme.basic';
import { NavItemsService } from '@abp/ng.theme.shared';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
    <abp-internet-status></abp-internet-status>
  `,
})
export class AppComponent {

  constructor(private navItems: NavItemsService) {
    navItems.patchItem(eThemeBasicComponents.Languages, {
      requiredPolicy: 'new policy here',
      order: 1,
    });

    navItems.removeItem(eThemeBasicComponents.NavItems);
  }
}
