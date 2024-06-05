import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { TabService } from '@proxy/tab/tab.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  providers: [TabService],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
