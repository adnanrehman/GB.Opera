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
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-global-indices',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule,CheckboxModule ],
  templateUrl: './global-indices.component.html',
  styleUrl: './global-indices.component.scss'
})
export class GlobalIndicesComponent {
  filteredCountries: any[];
  ingredient:any;
  data: any[] = [ 
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
    { sm: "NIKKIE 225",o:"6549.0000",h:"6539.5487",l:"1154287.6584",c:"208457.5596",v:"" },    
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
