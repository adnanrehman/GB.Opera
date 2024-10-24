import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { CompanyAndMarket_CountryGroup } from 'src/app/services/permissions';
import { CommonModule, NgFor } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TabViewModule } from 'primeng/tabview';
import { CountryGroupDto, CountryGroupService, GBSectorDto, InsertCountryGroupDto } from '@proxy/country-groups';
import { CapSizeDto, SectorDto } from '@proxy/commons';
import * as moment from 'moment';
import Swal from 'sweetalert2';
@Component({
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
      CheckboxModule,
      NgFor,
      ThemeSharedModule,
      ReactiveFormsModule,
      ListboxModule,
      InputTextModule,
      TabViewModule, TreeModule
    ],
  selector: 'app-country-group',
  standalone: true,
  
  templateUrl: './country-group.component.html',
  styleUrl: './country-group.component.scss'
})
export class CountryGroupComponent {
  loading: boolean = false;
  countryGroupID = 0
  countryGroups: CountryGroupDto[]=[];
  sectors:SectorDto[]=[];
  capSizes:CapSizeDto[]=[];
  gbSectors:GBSectorDto[]=[];
  gbCapSizes:GBSectorDto[]=[];
  selectedSectors:any[] = [];
  selectedCapsizess:any[] = [];
  countryGroupActivation!: number;
  countryGroup: CountryGroupDto = {
    countryGroupID: 0,
    isActive: false
  }
  insertCountryGroupmodel: InsertCountryGroupDto= {
    countryGroup: undefined,
    gbSectors: [],
    gbCapSizes: []
  }
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
      private permissionService: PermissionService,
      private countryGroupService: CountryGroupService    
    ) {
        this.permission = {
          create: false,
          edit : false,
          delete  :false
        }
    
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_CountryGroup + '.Delete')) {
      this.permission.delete = true;
    }
    this.getCountryGroups()
  }

  getCountryGroups() {
    this.loading = true;
    this.countryGroupService.getCountryGroups().subscribe(res => {
      debugger;
      this.countryGroups = res.countryGroups;
      this.sectors = res.sectors;
      this.capSizes = res.capSizes;
      this.gbSectors = res.gbSectors;
      this.gbCapSizes = res.gbCapSizes;
      this.loading = false;
      if (this.countryGroups.length > 0) {
        this.countryGroupID = this.countryGroups[0].countryGroupID;
        this.handleCountryGroup()
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  handleCountryGroup() {
    debugger;
    this.countryGroup = this.countryGroups.find(f => f.countryGroupID == this.countryGroupID);
    this.countryGroupActivation = this.countryGroup.isActive ? 1 : 0;
    this.countryGroup.formationDate = moment(this.countryGroup.formationDate).format("MM/DD/YYYY");
    var filterList = this.gbCapSizes.filter(f => f.countryGroupID == this.countryGroup.countryGroupID);
    this.selectedCapsizess = filterList.map(item => ({countryGroupId: item.countryGroupID, sectorID: this.capSizes.find(f => f.capSize.toUpperCase() == item.gbSector.toUpperCase()).capSizeID,isCapSize:true}))
    var filterListNew = this.gbSectors.filter(f => f.countryGroupID == this.countryGroup.countryGroupID);
    this.selectedSectors = filterListNew.map(item => ({countryGroupId: item.countryGroupID, sectorID: this.sectors.find(f => f.sector.toUpperCase() == item.gbSector.toUpperCase()).sectorID,isCapSize:false}))
    this.loading = false;
  }

  addNewCountryGroup() {
    this.countryGroup = {
      countryGroupID: 0,
      isActive: false
    };
  }

  insertCountryGroup() {
    debugger;
    this.loading = true;
    this.countryGroup.isActive = this.countryGroupActivation == 1 ? true : false;
    this.countryGroup.formationDate = moment(this.countryGroup.formationDate).format();
    this.insertCountryGroupmodel.countryGroup = this.countryGroup;
    this.insertCountryGroupmodel.gbSectors = this.selectedSectors;
    this.insertCountryGroupmodel.gbCapSizes = this.selectedCapsizess;
    this.countryGroupService.insertCountryGroupByModel(this.insertCountryGroupmodel).subscribe(res => {
      debugger;
      if (this.countryGroup.countryGroupID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.countryGroup.countryGroup + ' updated successfully', icon: 'success', });
        this.addNewCountryGroup();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.countryGroup.countryGroup + ' created successfully', icon: 'success', });
        this.addNewCountryGroup();
      }
      // this.handleCorporateAnnouncement(this.corporateAnnouncement);

      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }


}
