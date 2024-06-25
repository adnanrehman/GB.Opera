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
  selector: 'app-end-of-day',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule ],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {
  filteredCountries: any[];
  ingredient:any;
  data: any[] = [ 
    { sm: "TASI",tick:"Almatherrit",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"ACDF",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"ASD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"FRDS",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"JHYGSD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"JHASD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"VFDE",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"AFASDFDSF",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"DSFSD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"VBCDBD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"RGDFGD",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"SGSSDF",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"GYJG",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"HKJHJ",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"WERWE",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"DFSFSDF",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
    { sm: "TASI",tick:"JTYJHGJ",op:"8.0200",hp:"7.9000",lp:"8.0000",cp:"8.0200",tv:"80933",tv2:"641389.7800",tr:"138",lcp:"8.0200", },  
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
