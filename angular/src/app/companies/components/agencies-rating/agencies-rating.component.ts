import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-agencies-rating',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    TabViewModule,
    RadioButtonModule
  ],
  templateUrl: './agencies-rating.component.html',
  styleUrl: './agencies-rating.component.scss'
})
export class AgenciesRatingComponent {
  filteredCountries: any[];
  ingredient:any;
  subsidiaries: any[] = [ 
    { company: "KSE (Title)",share:"25",pa:"Traveler Cheques",order:"1" }, 
    { company: "BH (Title)",share:"100",pa:"Financial Services",order:"2" }, 
    { company: "OM (Title)",share:"300",pa:"Real Estates",order:"3" }, 
    { company: "QTR (Title)",share:"25",pa:"Traveler Cheques",order:"4" }, 
    { company: "UK (Title)",share:"100",pa:"Financial Services",order:"5" }, 
    { company: "GR (Title)",share:"300",pa:"Real Estates",order:"6" }, 
    { company: "FR (Title)",share:"300",pa:"Real Estates",order:"7" }, 
    { company: "USA (Title)",share:"300",pa:"Real Estates",order:"8" }, 
    { company: "SW (Title)",share:"300",pa:"Real Estates",order:"9" }, 
    { company: "MR (Title)",share:"300",pa:"Real Estates",order:"10" }, 
    { company: "BX (Title)",share:"300",pa:"Real Estates",order:"11" }, 
    { company: "JP (Title)",share:"300",pa:"Real Estates",order:"12" }, 
    { company: "SK (Title)",share:"300",pa:"Real Estates",order:"13" }, 
    { company: "CH (Title)",share:"300",pa:"Real Estates",order:"14" }, 
    { company: "IN (Title)",share:"300",pa:"Real Estates",order:"15" }, 
    { company: "SK Assets",share:"300",pa:"Real Estates",order:"19" }, 
  ];
  markets = [
    { name: 'TASI' },
    { name: 'ReactJS' },
    { name: 'Angular' },
    { name: 'Bootstrap' },
    { name: 'PrimeNG' },
  ];
  ngOnInit() {
    this.filteredCountries = [
      { name: 'RIBL', code: 'rible' },
      { name: 'Suadia Arabia', code: 'KSA' },
      { name: 'Dubai', code: 'UAE' },
      { name: 'IRAN', code: 'IR' },
    ];
  }
}
