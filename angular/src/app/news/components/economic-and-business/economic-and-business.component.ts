import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-economic-and-business',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './economic-and-business.component.html',
  styleUrl: './economic-and-business.component.scss'
})
export class EconomicAndBusinessComponent {
  filteredCountries: any[];
  Country = [ 
    { name: "Brazil" }, 
    { name: "Canada" }, 
    { name: "China" },
    { name: "France" },
    { name: "Germany" },
    { name: "India" },
    { name: "Japan" },
    { name: "USA" },
     
  ];
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  Language = [ 
    { name: "English" }, 
    { name: "Arabic" }, 
     
  ];
  companies: any[] = [ 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
    { company:  "IBL",ye:"DEC",est:"18-2-2024",order:"Sub DEC"  }, 
  ];
  ngOnInit() { 
    this.filteredCountries = [
      {name: "Brazil",code:'BR'},
      {name: "Canada Arabia",code:'Ca'},
      {name: "China",code:'CH'},
      {name: "USA",code:'USA'},
    ]
  }

}
