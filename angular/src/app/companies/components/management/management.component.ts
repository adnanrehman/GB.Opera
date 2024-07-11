import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CompanyManagementDto, CompanyManagmentService } from '@proxy/company-managements';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-management',
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
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent {
  loading: boolean = false;
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companyManagements = [];
  managements = [];
  seniorManagements = [];
  boardMembers = [];
  auditors = [];
  branches = [];
  companyFinancialOverviews = [];
  contactInformations = [];
  companyProjects = [];
  projectStatuses = [];
  filteredCountries: any[];
  companyManagement: CompanyManagementDto = {
    managements: [],
    seniorManagements: [],
    boardMembers: [],
    auditors: [],
    branches: [],
    companyFinancialOverviews: [],
    contactInformations: [],
    companyProjects: [],
    projectStatuses: [],
  };

  markets = [ 
    { name: "TASI" }, 
    { name: "ReactJS" }, 
    { name: "Angular" }, 
    { name: "Bootstrap" }, 
    { name: "PrimeNG" }, 
  ];

  constructor(
    private commonService: CommonService,
    private companyManagmentService: CompanyManagmentService
  ) {}

  ngOnInit() {
    this.getMarketLangAnnouncements();
    this.stockMarketID = 0;
  }

  getMarketLangAnnouncements() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.marketLangAnnouncement = res;
    });
  }

  getCompMarketSectorsByMarketID() {
    debugger;
    this.commonService.getCompMarketSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) this.getCompaniesTickersBySectorIDAndMarketID();
    });
  }

  getCompaniesTickersBySectorIDAndMarketID() {
    debugger;
    if(this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID
    this.commonService.getCompaniesTickersBySectorIDAndMarketID(this.sectorID,this.stockMarketID).subscribe(res => {
      this.companiesTickers = res;
      if (this.companiesTickers.length > 0) this.getCompanyManagements();
    });
  }

  getCompanyManagements() {
    debugger;
    if(this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID
    this.companyManagmentService
      .getCompaniesManagementByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.companyManagements = res;
        if (this.companyManagements.length > 0) this.handleCompanyManagement(this.companyManagements[0]);
      });
  }

  handleCompanyManagement(companyManagement: CompanyManagementDto) {
    debugger;
    this.managements = companyManagement.managements;
    this.seniorManagements = companyManagement.seniorManagements;
    this.boardMembers = companyManagement.boardMembers;
    this.auditors = companyManagement.auditors;
    this.branches = companyManagement.branches;
    this.companyFinancialOverviews = companyManagement.companyFinancialOverviews;
    this.contactInformations = companyManagement.contactInformations;
    this.companyProjects = companyManagement.companyProjects;
    this.projectStatuses = companyManagement.projectStatuses;
  }

  addNewCompanyManagement() {
    this.companyManagement = {
      managements: [],
      seniorManagements: [],
      boardMembers: [],
      auditors: [],
      branches: [],
      companyFinancialOverviews: [],
      contactInformations: [],
      companyProjects: [],
      projectStatuses: [],
    };
  }

  createOrUpdateCompanyManagement() {
    debugger;
    this.loading = true;
    this.companyManagmentService
      .createOrUpdateCompanyManagementByModel(this.companyManagement.managements[0])
      .subscribe(
        res => {
          debugger;
          if (this.companyManagement.managements[0].managementID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyManagement.managements[0].chairman + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyManagement.managements[0].chairman + ' created successfully',
              icon: 'success',
            });
          this.handleCompanyManagement(this.companyManagement);
          this.loading = false;
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }
}
