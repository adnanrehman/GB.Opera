import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'app-current-dividends',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, FormsModule,DropdownModule,ImageModule,FileUploadModule,TabViewModule],
  templateUrl: './current-dividends.component.html',
  styleUrl: './current-dividends.component.scss'
})
export class CurrentDividendsComponent {

  markets = [ 
    { name: "ADX" }, 
    { name: "BSE" }, 
    { name: "DAX" },
    { name: "DFM" },
    { name: "KSE" },
     
  ];
  dividends: any[] = [ 
    { company:  "AABR",ye:"25000",est:"AABR",order:"Ending December 2017  ..."  }, 
    { company:  "AABR",ye:"65478",est:"EAABR",order:"Ending December 2017  ..."  }, 
    { company:  "ADIB",ye:"36477",est:"AABR",order:"Ending December 2017  ..."  }, 
    { company:  "AFNIC",ye:"3654",est:"AABR",order:"Ending December 2017  ..."  }, 
  ];

}
