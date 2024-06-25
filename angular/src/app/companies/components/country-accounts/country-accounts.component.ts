import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-country-accounts',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    TabViewModule,
    TreeModule,
  ],
  templateUrl: './country-accounts.component.html',
  styleUrl: './country-accounts.component.scss',
})
export class CountryAccountsComponent {
  filteredCountries: any[];
  tree: TreeNode[];
  data: TreeNode[];
  subsidiaries: any[] = [
    { company: 'Suadi Travels Cheque', share: '25', pa: 'Traveler Cheques', order: '' },
    { company: 'Riyadh Capitol', share: '100', pa: 'Financial Services', order: '' },
    { company: 'Ithara Alriyadh', share: '300', pa: 'Real Estates', order: '' },
    { company: 'Suadi Travels Cheque', share: '25', pa: 'Traveler Cheques', order: '' },
    { company: 'Riyadh Capitol', share: '100', pa: 'Financial Services', order: '' },
    { company: 'Ithara Alriyadh', share: '300', pa: 'Real Estates', order: '' },
  ];
  markets = [
    { name: 'TASI' },
    { name: 'ReactJS' },
    { name: 'Angular' },
    { name: 'Bootstrap' },
    { name: 'PrimeNG' },
  ];
  ngOnInit() {
    this.filteredCountries = [
      { name: 'RIBL', code: 'rible' },
      { name: 'Suadia Arabia', code: 'KSA' },
      { name: 'Dubai', code: 'UAE' },
      { name: 'IRAN', code: 'IR' },
    ];
    this.data = [
      {
        label: 'NGL sales',
        children: [
          { label: 'Propane' },
          { label: 'Butane' },
          { label: 'Condensate' },
          { label: 'Natural gasoline' },
          { label: 'Total NGL sales' },
        ],
      },
      {
        label: 'Sulfur',
        children: [
          { label: 'Sulfur recovery' },
          { label: 'Sulfur exports' },
        ],
      },
      {
        label: 'Principal products manufactured in Kingdom refineries',
        children: [
          { label: 'Sulfur recovery' },
          { label: 'LPG' },
          { label: 'Naphtha Gasoline' },
          { label: 'Jet fuel/ kerosene' },
          { label: 'Diesel' },
          { label: 'Fuel oil' },
          { label: 'Asphalt & misc.' },
          { label: 'Total Principal products manufactured in Kingdom refineries' },
        ],
      },
      {
        label: 'Work Force',
        children: [
          { label: 'Saudi Workforce' },
          { label: 'Expatriate Workforce' },
          { label: 'Total Workforce' },
        ],
      },
      {
        label: 'Ships calls at Saudi Aramco terminals',
        children: [
          { label: 'Crude oil' },
          { label: 'Products' },
          { label: 'LPG' },
          { label: 'Total Ship calls' },
        ],
      },    
    ];
  }
}
