import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CompanyComponent } from 'src/app/news/components/company/company.component';
import { CompanySectorComponent } from '../company-sector/company-sector.component';
import { CommonService } from '@proxy/commons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-company-autocomplete',
  standalone: true,
  imports: [CommonModule,
    AutoCompleteModule,
    ThemeSharedModule,
    FormsModule,],
  templateUrl: './company-autocomplete.component.html',
  styleUrl: './company-autocomplete.component.scss',
})
export class CompanyAutocompleteComponent {
  @Output() dataEventAutoComplete = new EventEmitter<any>();

  selectedItem: any;
  loading:boolean =false;
  suggestions: any[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  search(event: AutoCompleteCompleteEvent) {
   // this.loading =true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
   //   this.loading =false;
    });
  }

  onSelect(event: any) {
    debugger;
   // this.loading =true;
    this.sendDataToParent(event.value);
  //  this.loading =false;
  }

  sendDataToParent(company: any) {
    this.dataEventAutoComplete.emit(company);
    this.selectedItem = "";
}
}
