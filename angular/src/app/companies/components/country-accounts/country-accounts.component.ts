import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CommonService, ESDFactDto } from '@proxy/commons';
import { CountryAccountDto, CountryAccountService } from '@proxy/country-accounts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-accounts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule,TreeModule
  ],
  templateUrl: './country-accounts.component.html',
  styleUrl: './country-accounts.component.scss',
})
export class CountryAccountsComponent {
  loading: boolean = false;
  countryID: number;
  countryName: string;
  countries = [];
  ESDFacts: ESDFactDto[];
  selectedNode: TreeNode;
  selectedNodes: any[] = [];

  constructor(
    private commonService: CommonService,
    private countryAccountService:CountryAccountService
  ) {}

  ngOnInit() {
    this.getCountriesForIndicators();
    this.fetchESDFacts();
  }

  
  fetchESDFacts(): void {
    debugger; // For debugging purposes
    this.loading =true;
    this.commonService.getAllESDFactsMappings().subscribe(res => {
      console.log('Tree res:', res);
      
      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.ESDFacts = res.map(item => {
        let newItem = {
          ...item,
          label: item.esdFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          children: []
        };
        idMap[newItem.esdFactID] = newItem;
        return newItem;
      });
  
      // Build the tree structure
      let treeData = [];
      this.ESDFacts.forEach(item => {
        if (item.parentID === 0) {
          treeData.push(item);
        } else {
          let parentItem = idMap[item.parentID];
          if (parentItem) {
            parentItem.children.push(item);
            item = parentItem;
          } else {
            console.error(`Parent id ${item.parentID} not found in idMap.`);
          }
        }
      });
  
      // Assign the final tree data to gbFactListDto
      this.ESDFacts = treeData;
      this.loading =false;
      console.log('Tree Data:', this.ESDFacts);
    });
  }

  getCountriesForIndicators() {
    this.loading =true;
    this.commonService.getCountriesForIndicators().subscribe(res => {
      this.countries = res;
      if(this.countries.length > 0) this.getCountriesFactsByCountryID();
      this.loading =false;
    });
  }

  getCountriesFactsByCountryID(): void {
    debugger; // For debugging purposes
    if (this.countryID == undefined && this.countries.length > 0)
      this.countryID = this.countries[0].countryID;
    this.countryAccountService.getCountriesFactsByCountryID(this.countryID).subscribe(res => {
      console.log('Tree res:', res);
      this.selectedNodes =[];
      if(res.length > 0){
        this.countryName = this.countries.find(f => f.countryID == this.countryID).country
        this.NodeSelection(this.ESDFacts,res);
      }

      this.loading = false;
    });
  }

  NodeSelection(list: any[],esdFacts: any[]) {    
    for (let x of list) {
      var esdFact = esdFacts.find(f => f.esdFactID == x.esdFactID);
        if(esdFact){
          this.selectedNodes.push(x);
        }
      if (x.children.length !== 0) {
        var result = this.NodeSelection(x.children,esdFacts);
        if(result){ 
          return true;
        }
      } 
  
    }
  
    return false;
  
  }

  onNodeSelect(event: { originalEvent: Event, node: any }): void {
   debugger;
    this.selectedNode = event.node;
    var exist = this.selectedNodes.find(f => f.esdFactID == event.node.esdFactId)
    if(!exist)  
      this.selectedNodes.push(event.node)
     
  }
  onNodeUnselect(event: { originalEvent: Event, node: any }): void {
    debugger;
     this.selectedNodes = this.selectedNodes.filter(n => n.esdFactID != event.node.esdFactID)
   }

  save() {
    debugger;
    this.loading =true;
    const countryAccount: CountryAccountDto[] = this.mapESDFactsToCountryFactMapping(this.selectedNodes);
    this.countryAccountService.createOrUpdateCountryFactByList(countryAccount).subscribe({
      next: (res) => {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
        console.log('Save response:', res);    
        this.loading =false;  
      },
      error: (err) => {
        console.error("Error While Saveing", err);
        this.loading =false;  
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          title: 'Error!',
          text: "Error While Saveing",
          icon: 'error'
        });
       
       // alert("Save error: " + err.message); // Display error message to user
      }
    });
  }
    
  mapESDFactsToCountryFactMapping(companyGBFactMapping: ESDFactDto[]): CountryAccountDto[] {
      return companyGBFactMapping.map(dto => ({
        countryID: this.countryID,
        esdFactID:  dto.esdFactID, 
        parentID: dto.parentID,
        countryCustomFactName:  dto.esdFact, 
        aCountryCustomFactName: dto.aesdFact        
    }));
  }
}
