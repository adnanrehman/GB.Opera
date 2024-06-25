import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-gulfbase-price',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule ],
  templateUrl: './gulfbase-price.component.html',
  styleUrl: './gulfbase-price.component.scss'
})
export class GulfbasePriceComponent {
  filteredCountries: any[];
  ingredient:any;
  data: any[] = [ 
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"2323.0000",pv:"1561.5487",v:"1656558.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"2518.0000",pv:"1512.5487",v:"5615615.6584" },   
    { sm: "TASI",sector:"Small Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Small Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
    { sm: "TASI",sector:"Large Cap",iv:"6549.0000",pv:"6539.5487",v:"1154287.6584" },   
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
