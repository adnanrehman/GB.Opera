import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CommonService, CompDropdownDto } from '@proxy/commons';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,NgFor ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  filteredCountries: any[];
  compDropdown!:CompDropdownDto;
  companies: any[] = [ 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
    { company: "Riyadh",ticker:"IBL",ye:"DEC",est:"18-2-2024",order:"4501",alternate:"",st:"6565",eng:"Riyadd" }, 
  ];
  markets = []; 
  marketID:number;
  constructor(private commonService: CommonService,
  ) {

  }

  ngOnInit() { 
    this.getCompStockMarkets();
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ]
  }

  getCompStockMarkets(){
    this.commonService.getCompStockMarkets().subscribe((res => {
        this.markets = res;
    }));
  }

  fillCompByMarketId(){
    this.commonService.getCompMSectorsByMarketID(this.marketID).subscribe((res => {
      debugger;
      this.compDropdown = res;
  }));
  }
  
}
