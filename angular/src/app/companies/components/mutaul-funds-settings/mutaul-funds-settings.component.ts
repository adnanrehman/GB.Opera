import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CompanyMutualFundSettingService } from '@proxy/company-mutual-fund-settings';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PermissionService } from '@abp/ng.core';
import { Company_MutaulFundsSettings } from 'src/app/services/permissions';

@Component({
  selector: 'app-mutaul-funds-settings',
  standalone: true,
  imports: [CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    NgIf,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputNumberModule,
    InputTextModule,],
  templateUrl: './mutaul-funds-settings.component.html',
  styleUrl: './mutaul-funds-settings.component.scss'
})
export class MutaulFundsSettingsComponent {
  filteredCountries: any[];
  assetsAllocations = [];
  geoDiversifications = [];
  sectorDiversifications = [];
  majorInvestments = [];
  benchmarks = [];
  portfolioTypes = [];
  mfListings = [];
  mfRisks = [];
  mfClassifications = [];
  mfCategories = [];
  mfSubCategories = [];
  settingID: number = 1;
  companyMutualFundSettings: any[] = [
    { settingID: 1, settingName: "Assets Allocations" },
    { settingID: 2, settingName: "Benchmarks" },
    { settingID: 3, settingName: "Categories" },
    { settingID: 4, settingName: "Classifications" },
    { settingID: 5, settingName: "Geo Dirversifications" },
    { settingID: 6, settingName: "Listings" },
    { settingID: 7, settingName: "Major Invetsments" },
    { settingID: 8, settingName: "Portfolio Types" },
    { settingID: 9, settingName: "Risks" },
    { settingID: 10, settingName: "Sector Dirversifications" },
    { settingID: 11, settingName: "Sub Categories" },
  ]
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private companyMutualFundSettingService: CompanyMutualFundSettingService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_MutaulFundsSettings + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_MutaulFundsSettings + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_MutaulFundsSettings + '.delete')) {
      this.permission.delete = true;
    }
    this.getCompanyMutualFundSettings();
  }

  getCompanyMutualFundSettings() {
    this.companyMutualFundSettingService.getCompanyMutualFundSettings().subscribe(res => {
      this.assetsAllocations = res.assetsAllocations;
      this.geoDiversifications = res.geoDiversifications;
      this.sectorDiversifications = res.sectorDiversifications;
      this.majorInvestments = res.majorInvestments;
      this.benchmarks = res.benchmarks;
      this.portfolioTypes = res.portfolioTypes;
      this.mfListings = res.mfListings;
      this.mfRisks = res.mfRisks;
      this.mfClassifications = res.mfClassifications;
      this.mfCategories = res.mfCategories;
      this.mfSubCategories = res.mfSubCategories;
    });
  }
}
