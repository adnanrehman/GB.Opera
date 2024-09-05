import { PermissionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { Financial_HistoricalCashDividends } from 'src/app/services/permissions';

@Component({
  selector: 'app-historical-cash-dividends',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './historical-cash-dividends.component.html',
  styleUrl: './historical-cash-dividends.component.scss'
})
export class HistoricalCashDividendsComponent {
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  filteredCountries: any[];
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"25-10-23",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"25-10-23",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"25-10-23",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25-10-23",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"25-10-23",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"25-10-23",pa:"Real Estates",order:"" }, 
  ];
  Period = [ 
    { name: "Yearly" }, 
    { name: "1st Quarter" }, 
    { name: "2 Quarter" }, 
    { name: "3 Quarter" }, 
    { name: "4 Quarter" }, 
  ];
  Information = [ 
    { name: "Market Site" }, 
    { name: "Company Site" }, 
    { name: "Any Other" }, 
     
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_HistoricalCashDividends + '.delete')) {
      this.permission.delete = true;
    }
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
  }
}
