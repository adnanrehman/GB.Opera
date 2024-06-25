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
  selector: 'app-intra-day',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule,RadioButtonModule ],
  templateUrl: './intra-day.component.html',
  styleUrl: './intra-day.component.scss'
})
export class IntraDayComponent {
  filteredCountries: any[];
  ingredient:any;
  data: any[] = [ 
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.6351",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.1562",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5121",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5487",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.1512",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
    { sm: "TASI",tick:"SAIB",p:"1.5480",tv:"0",tv2:"0",tr:"0",qp:"0.000", },    
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
