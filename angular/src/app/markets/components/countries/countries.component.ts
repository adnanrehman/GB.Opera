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
  selector: 'app-countries',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {

  GbName = [ 
    { name: "Americas" }, 
    { name: "Asia" }, 
    { name: "GCC" },
    { name: "New Group" },
    { name: "The World" },
     
  ];

  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  IndicatorType = [ 
    { name: "Actual" }, 
    { name: "Estimated" }, 
    { name: "Forcasted" },
    
  ];

  ValueIn = [ 
    { name: "$" }, 
    { name: "%" }, 
    { name: "Billion" },
    { name: "PKR" },
    
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  ngOnInit() {
  }
}
