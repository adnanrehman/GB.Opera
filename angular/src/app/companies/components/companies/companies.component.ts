import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  filteredCountries: any[];
  companies: any[] = [ 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
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
