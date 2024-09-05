import { Component } from '@angular/core';
import { FormsModule, NumberValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CompanyMutualFundDto, CompanyMutualFundService } from '@proxy/company-mutual-funds';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { InputNumberModule } from 'primeng/inputnumber';
import { PermissionService } from '@abp/ng.core';
import { Company_MutaulFunds } from 'src/app/services/permissions';

@Component({
  selector: 'app-mutaul-funds',
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
    InputNumberModule,
    InputTextModule,
  ],
  templateUrl: './mutaul-funds.component.html',
  styleUrl: './mutaul-funds.component.scss'
})
export class MutaulFundsComponent {
  loading: boolean = false;
  selectedItem: any;
  suggestions: any[] = [];
  stockMarketID: number;
  companyID: number;
  mFundID: number;
  stockMarkets = [];
  companiesTickers = [];
  companyMutualFunds = [];
  mFundGeoDiversPercents = [];
  mFundGeoDiversPercentsList = [];
  mFundAssestAllocsPercents = [];
  mFundAssestAllocsPercentsList = [];
  mFundMajorInvestPercents = [];
  mFundMajorInvestPercentsList = [];
  mFundSectorDiversPercents = [];
  mFundSectorDiversPercentsList = [];
  companies = [];
  assetsAllocations = [];
  geoDiversifications = [];
  sectorDiversifications = [];
  majorInvestments = [];
  benchmarks = [];
  currencies = [];
  portfolioTypes = [];
  mfListings = [];
  mfRisks = [];
  mfClassifications = [];
  mfCategories = [];
  mfSubCategories = [];
  companyMutualFundActivation!: number;
  companyMutualFund: CompanyMutualFundDto = {
    mFundID: 0
  };
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  markets = [
    { name: "TASI" },
    { name: "ReactJS" },
    { name: "Angular" },
    { name: "Bootstrap" },
    { name: "PrimeNG" },
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private companyMutualFundService: CompanyMutualFundService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_MutaulFunds + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_MutaulFunds + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_MutaulFunds + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.stockMarketID = 0;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    this.stockMarketID = event.value.stockMarketID;
    this.companyID = event.value.companyID
    this.getCompaniesWithHasFundByStockMarketID();
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
    });
  }

  getCompaniesWithHasFundByStockMarketID() {
    this.commonService.getCompaniesWithHasFundByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companies = res.companies;
      this.assetsAllocations = res.assetsAllocations;
      this.geoDiversifications = res.geoDiversifications;
      this.sectorDiversifications = res.sectorDiversifications;
      this.majorInvestments = res.majorInvestments;
      this.benchmarks = res.benchmarks;
      this.currencies = res.currencies;
      this.portfolioTypes = res.portfolioTypes;
      this.mfListings = res.mfListings;
      this.mfRisks = res.mfRisks;
      this.mfClassifications = res.mfClassifications;
      this.mfCategories = res.mfCategories;
      this.mfSubCategories = res.mfSubCategories;
      if (this.companies.length > 0) this.getCompanyMutualFundsByCompanyID();
      else this.loading = false;
    });
  }

  getCompanyMutualFundsByCompanyID() {
    debugger;
    if (this.companyID == undefined && this.companies.length > 0)
      this.companyID = this.companies[0].companyID;
    this.companyMutualFundService
      .getCompanyMutualFundsByCompanyID(this.companyID)
      .subscribe(res => {
        this.companyMutualFunds = res.companyMutualFunds;
        this.mFundGeoDiversPercents = res.mFundGeoDiversPercents;
        this.mFundGeoDiversPercentsList = res.mFundGeoDiversPercents;
        this.mFundAssestAllocsPercents = res.mFundAssestAllocsPercents;
        this.mFundAssestAllocsPercentsList = res.mFundAssestAllocsPercents;
        this.mFundMajorInvestPercents = res.mFundMajorInvestPercents;
        this.mFundMajorInvestPercentsList = res.mFundMajorInvestPercents;
        this.mFundSectorDiversPercents = res.mFundSectorDiversPercents;
        this.mFundSectorDiversPercentsList = res.mFundSectorDiversPercents;
        if (this.companyMutualFunds.length > 0) this.handleCompanyMutualFund(this.companyMutualFunds[0].mFundID);
        else this.loading = false;
      });
  }

  handleCompanyMutualFund(mFundID: number) {
    debugger;
    if (mFundID) {
      this.companyMutualFund = this.companyMutualFunds.find(f => f.mFundID == mFundID);
      this.mFundID = mFundID;
    }

    else {
      this.companyMutualFund = this.companyMutualFunds[0];
      this.mFundID = this.companyMutualFund.mFundID;
    }

    this.companyMutualFundActivation = this.companyMutualFund.isActive ? 1 : 0;
    this.mFundGeoDiversPercents = this.mFundGeoDiversPercentsList.filter(f => f.mFundID == mFundID);
    this.mFundAssestAllocsPercents = this.mFundAssestAllocsPercentsList.filter(f => f.mFundID == mFundID);
    this.mFundMajorInvestPercents = this.mFundMajorInvestPercentsList.filter(f => f.mFundID == mFundID);
    this.mFundSectorDiversPercents = this.mFundSectorDiversPercentsList.filter(f => f.mFundID == mFundID);
    this.loading = false;
  }

  addNewCompanyMutualFund() {
    this.companyMutualFund = {
      mFundID: 0
    };
  }

  createOrUpdateCompanyMutualFund() {
    debugger;
    this.loading = true;
    this.companyMutualFund.isActive = this.companyMutualFundActivation == 1 ? true : false;
    this.companyMutualFund.companyID = this.companyID;
    this.companyMutualFundService.createOrUpdateCompanyMutualFundByModel(this.companyMutualFund).subscribe(res => {
      debugger;
      if (this.companyMutualFund.mFundID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companyMutualFund.name + ' updated successfully', icon: 'success', });
        this.getCompanyMutualFundsByCompanyID();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companyMutualFund.name + ' created successfully', icon: 'success', });
        this.getCompanyMutualFundsByCompanyID();
      }
      this.handleCompanyMutualFund(this.companyMutualFund.mFundID);

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
