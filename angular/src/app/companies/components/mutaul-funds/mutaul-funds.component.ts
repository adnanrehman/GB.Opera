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
  selector: 'app-mutaul-funds',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './mutaul-funds.component.html',
  styleUrl: './mutaul-funds.component.scss'
})
export class MutaulFundsComponent {
  filteredCountries: any[];
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"23.45",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"25.25",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"75.14",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25.69",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"56.56",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"85.65",pa:"Real Estates",order:"" }, 
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
