import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { CompanyAndMarket_CurrencyExchange } from 'src/app/services/permissions';

@Component({
  selector: 'app-currency-exchange',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, 
    FormsModule,DropdownModule,ImageModule,FileUploadModule,TabViewModule,CommonModule],
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss'
})
export class CurrencyExchangeComponent {
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(  private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }
  ngOninit()
  {
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CurrencyExchange + '.Delete')) {
      this.permission.delete = true;
    }
  }
}
