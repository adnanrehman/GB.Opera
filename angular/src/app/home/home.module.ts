import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule, NgFor, NgIf } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule,TabViewModule,AccordionModule,NgxSpinnerModule,NgFor,NgIf,CommonModule],
})
export class HomeModule {}
