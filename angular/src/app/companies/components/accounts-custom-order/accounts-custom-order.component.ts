import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-accounts-custom-order',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,CheckboxModule ],
  templateUrl: './accounts-custom-order.component.html',
  styleUrl: './accounts-custom-order.component.scss'
})
export class AccountsCustomOrderComponent {
  filteredCountries: any[];
  subsidiaries: any[] = [ 
    { company: "Income Statement (Title)",share:"25",pa:"Traveler Cheques",order:"1" }, 
    { company: "Special Commission Income",share:"100",pa:"Financial Services",order:"2" }, 
    { company: "Special Commission Expense",share:"300",pa:"Real Estates",order:"3" }, 
    { company: "Net Commission Income",share:"25",pa:"Traveler Cheques",order:"4" }, 
    { company: "Other Operating Income",share:"100",pa:"Financial Services",order:"5" }, 
    { company: "Total Operating Income Gen",share:"300",pa:"Real Estates",order:"6" }, 
    { company: "Admin Expenses",share:"300",pa:"Real Estates",order:"7" }, 
    { company: "Other Expenses",share:"300",pa:"Real Estates",order:"8" }, 
    { company: "Depreciation & Amortization",share:"300",pa:"Real Estates",order:"9" }, 
    { company: "Pre-Tax Profit",share:"300",pa:"Real Estates",order:"10" }, 
    { company: "Net Profit",share:"300",pa:"Real Estates",order:"11" }, 
    { company: "Total Dividends",share:"300",pa:"Real Estates",order:"12" }, 
    { company: "Balance Sheet (Title)",share:"300",pa:"Real Estates",order:"13" }, 
    { company: "Assets (Title)",share:"300",pa:"Real Estates",order:"14" }, 
    { company: "Cash & Balance",share:"300",pa:"Real Estates",order:"15" }, 
    { company: "Total Assets",share:"300",pa:"Real Estates",order:"19" }, 
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  ngOnInit() { 
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
  }
}
