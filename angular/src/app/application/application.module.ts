import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application/application.component';
import { TabService } from '../tab/tab.service';
import { MenuService } from '../menu/menu.service';

@NgModule({
  declarations: [ApplicationComponent],
  providers: [TabService,MenuService],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
