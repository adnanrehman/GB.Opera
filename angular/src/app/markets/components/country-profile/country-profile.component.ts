import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'app-country-profile',
  standalone: true,
  imports: [TableModule,TreeModule,CalendarModule,AutoCompleteModule, FormsModule,DropdownModule,ImageModule,FileUploadModule,TabViewModule],
  templateUrl: './country-profile.component.html',
  styleUrl: './country-profile.component.scss'
})
export class CountryProfileComponent {
  tree:TreeNode[];
  ngOnInit() {
    this.tree = [
      {
        label: 'Country Profile',
        children: [
          {
            label: 'Bahrain',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          },
          {
            label: 'AMR',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          },
          {
            label: 'Saudia',
            children: [
              { label: 'Country Profile' },
              { label: 'Stock Markets' },
              { label: 'Broker' },
              { label: 'Vendor' }
            ]
          }
        ]
      }
    ];
  }

}
