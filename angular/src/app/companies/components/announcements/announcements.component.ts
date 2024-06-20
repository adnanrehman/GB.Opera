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
  selector: 'app-announcements',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  filteredCountries: any[];
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"25-10-23",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"25-10-23",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"25-10-23",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25-10-23",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"25-10-23",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"25-10-23",pa:"Real Estates",order:"" }, 
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
