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
  selector: 'app-gulfbase',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ImageModule,FileUploadModule,TabViewModule ],
  templateUrl: './gulfbase.component.html',
  styleUrl: './gulfbase.component.scss'
})
export class GulfbaseComponent {
  active = [ 
    { name: "true" }, 
    { name: "false" }, 
     
  ];
  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];
  sector = [ 
    { name: "Bank" }, 
    { name: "Consumer" }, 
    { name: "Energy" }, 
    { name: "Services" }, 
    { name: "Real State" }, 
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
     
  }

}
