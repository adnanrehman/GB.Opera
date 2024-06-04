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

  constructor(private renderer: Renderer2,private elRef:ElementRef) {}

  ngAfterViewInit() {
    debugger;
    var result = this.elRef.nativeElement.getElementsByClassName("lpx-menu-item-link");
    Array.from(result).forEach((el) => {
      this.renderer.setAttribute(el,"target", "_blank");
      this.renderer.setAttribute(el,'id', `1122`);
  });
  }
}
