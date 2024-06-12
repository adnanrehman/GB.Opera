import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { TabService } from '@proxy/tab/tab.service';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application/application.component';
import { MenuService } from '@proxy/menu/menu.service';

@NgModule({
  declarations: [ApplicationComponent],
  providers: [TabService,MenuService],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
