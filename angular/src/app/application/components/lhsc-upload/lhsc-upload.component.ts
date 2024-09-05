import { PermissionService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Company } from '@proxy/lhruploads';
import { LHRUploadsService } from '@proxy/lhruploads/lhruploads.service';
import { TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { Application_LhscUpload } from 'src/app/services/permissions';
@Component({
  selector: 'app-lhsc-upload',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CommonModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule ,ListboxModule],
  templateUrl: './lhsc-upload.component.html',
  styleUrl: './lhsc-upload.component.scss'
})
export class LhscUploadComponent {
  filteredCountries: any[];
  markets = [];
  tree:TreeNode[];
  data:TreeNode[];
  stockmarketid : number;
  CompanyList: Company[]
  subsidiaries: any[] = [ 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
    { company: "Suadi Travels Cheque",share:"25",pa:"Traveler Cheques",order:"" }, 
    { company: "Riyadh Capitol",share:"100",pa:"Financial Services",order:"" }, 
    { company: "Ithara Alriyadh",share:"300",pa:"Real Estates",order:"" }, 
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }

  constructor(private lhruploadsservice : LHRUploadsService , private permissionService: PermissionService)
  {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
  }
  getAllStockMarkets() {
    
    this.lhruploadsservice.getAllStockMarkets( ).subscribe(res => {
      this.markets = res;
       
    });
  }
 
  getcompanies() {
    debugger; // For debugging purposes
    this.lhruploadsservice.getCompaniesFromMarketByStockMarketID(this.stockmarketid).subscribe(res => {
      console.log('Tree res:', res);
      
      // Initialize idMap and CompanyList
      let idMap: { [key: number]: Company } = {};
      this.CompanyList = res.map(item => {
        let newItem = {
          ...item,
          label: item.ticker || '', // Assign ticker to label or default to empty string
          parentID: null,
          children: []
        };
        idMap[newItem.companyID] = newItem;
        return newItem;
      });
    
      // Build the tree structure
      let treeData: Company[] = [];
      this.CompanyList.forEach(item => {
        if (item.parentID === 0 || !item.parentID) {
          treeData.push(item);
        } else {
          let parentItem = idMap[item.parentID];
          if (parentItem) {
            parentItem.children.push(item);
          } else {
            console.warn(`Parent item with ID ${item.parentID} not found for item ${item.companyID}`);
          }
        }
      });
    
      // Assign the final tree data to CompanyList
      this.CompanyList = treeData;
      console.log('Tree Data:', this.CompanyList);
    });
  }
  ngOnInit() { 
    debugger;
    if (this.permissionService.getGrantedPolicy(Application_LhscUpload + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_LhscUpload + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_LhscUpload + '.Delete')) {
      this.permission.delete = true;
    }
    this.getAllStockMarkets();
    this.filteredCountries = [
      {name: "RIBL",code:'rible'},
      {name: "Suadia Arabia",code:'KSA'},
      {name: "Dubai",code:'UAE'},
      {name: "IRAN",code:'IR'},
    ];

    

       this.tree=[
        {
          label:'Accounts Breakdown',
          children :[
            {
              label:'Revenues',
              children:[
                {
                  label:'Total Operating Income',
                },
                {
                  label:'Sales',
                },
                {
                  label:'Revenues',
                },
                {
                  label:'Gross Premiums',
                },
      
              ]
            }
          ],
        }
      ]
  }

}
