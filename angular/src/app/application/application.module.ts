import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { TabService } from '@proxy/tab/tab.service';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application/application.component';

@NgModule({
  declarations: [ApplicationComponent],
  providers: [TabService],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
