import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-mutaul-funds-settings',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './mutaul-funds-settings.component.html',
  styleUrl: './mutaul-funds-settings.component.scss'
})
export class MutaulFundsSettingsComponent {
  filteredCountries: any[];
  subsidiaries: any[] = [ 
    { company: "Assets Allocation",share:"23.45",pa:"Traveler Cheques",order:"المرابحة و الودائع الثابتة الصكوك أسهم" }, 
    { company: "Murabaha & Fixed Deposits",share:"25.25",pa:"Financial Services",order:"العقارات" }, 
    { company: "Sukuk",share:"75.14",pa:"Real Estates",order:"صناديق سوق النقد" }, 
    { company: "Equities",share:"25.69",pa:"Traveler Cheques",order:"النقد و ما يعادله" }, 
    { company: "Real Estate",share:"56.56",pa:"Financial Services",order:"أدوات النقد الإسلامية |" }, 
    { company: "Money Market Funds",share:"85.65",pa:"Real Estates",order:"السندات" }, 
    { company: "Cash & Cash Equivalents",share:"85.65",pa:"Real Estates",order:"أسهم خليجية" }, 
    { company: "Islamic Instruments",share:"85.65",pa:"Real Estates",order:"الدخل الثابت" }, 
    { company: "Bonds",share:"85.65",pa:"Real Estates",order:"التحويلات" }, 
    { company: "Bond Funds",share:"85.65",pa:"Real Estates",order:"الطرح المبدئي العام " }, 
    { company: "UAE Equity",share:"85.65",pa:"Real Estates",order:"المرابحة" }, 
    { company: "Non UAE Equity",share:"85.65",pa:"Real Estates",order:"الودائع الإسلامية والنقد" }, 
    { company: "Cash",share:"85.65",pa:"Real Estates",order:"استراتيجيات بديلة" }, 
    { company: "Fixed Income",share:"85.65",pa:"Real Estates",order:"استراتيجيات بديلة" }, 
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
