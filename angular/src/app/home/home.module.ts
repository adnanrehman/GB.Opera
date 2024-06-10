import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule,TabViewModule,AccordionModule,NgxSpinnerModule],
})
export class HomeModule {}
