import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabView, TabViewModule } from 'primeng/tabview';
import { AuditorDto, BoardMemberDto, BranchDto, CompanyFinancialOverviewDto, CompanyManagementDto, CompanyManagmentService, CompanyProjectDto, ContactInformationDto, ManagementDto, ProjectStatusDto, SeniorManagementDto } from '@proxy/company-managements';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { FinancialsAdminComponent } from 'src/app/financials/components/financials-admin/financials-admin.component';

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
  headerValue:any;
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  marketLangAnnouncement = [];
  companyMarketSectors = [];
  companiesTickers = [];
  companyManagements: any = {};
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
  management:ManagementDto = {
    managementID: 0,
    companyID: 0,
    isActive: false
  }
  seniorManagement:SeniorManagementDto = {
    seniorManagementID: 0,
    companyID: 0
  }
  boardMember:BoardMemberDto = {
    boardMemberID: 0,
    companyID: 0
  }
  auditor:AuditorDto = {
    auditorID: 0,
    companyID: 0
  }
  branch:BranchDto = {
    branchID: 0,
    companyID: 0,
    isActive: false
  }
  companyFinancialOverview: CompanyFinancialOverviewDto = {
    overviewID: 0,
    companyID: 0,
    isActive: false
  }
  contactInfo:ContactInformationDto = {
    contactInfoID: 0,
    companyID: 0
  }
  companyProject: CompanyProjectDto = {
    projectID: 0,
    companyID: 0,
    projectStatusID: 0,
    active: false
  }
  projectStatus: ProjectStatusDto ={
    projectStatusID: 0
  }
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

  managementActivation!: number;
  seniorManagementActivation!: number;
  boardMemberActivation!: number;
  auditorActivation!: number;
  branchActivation!: number;
  companyFinancialOverviewActivation!: number;
  contactInformationActivation!: number;
  companyProjectActivation!: number;
  projectStatusActivation!: number;
  activationDropdown: any[] = 
  [
    {value:0,displayText:"No"},
    {value:1,displayText:"Yes"}
  ]

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
    this.loading = true;
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
        if (this.companyManagements.managements.length > 0) this.handleCompanyManagement(this.companyManagements);
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
    this.loading = false;
    if(this.managements.length > 0) this.handleManagement(this.managements[0])
  }

  handleManagement(management:ManagementDto){
    this.management = management;
    this.managementActivation = this.management.isActive ? 1 : 0;
    this.headerValue = "Key Peoples";
  }
  handleseniorManagement(seniorManagement:SeniorManagementDto){
    this.seniorManagement = seniorManagement;
    this.seniorManagementActivation = this.seniorManagement.isActive ? 1 : 0;
  }
  handleboardMember(boardMember:BoardMemberDto){
    this.boardMember = boardMember;
    this.boardMemberActivation = this.boardMember.isActive ? 1 : 0;
  }
  handleauditor(auditor:AuditorDto){
    this.auditor = auditor;
    this.auditorActivation = this.auditor.isActive ? 1 : 0;
  }
  handleBranch(branch:BranchDto){
    this.branch = branch;
    this.branchActivation = this.branch.isActive ? 1 : 0;
  }
  handlecompanyFinancialOverview(companyFinancialOverview:CompanyFinancialOverviewDto){
    this.companyFinancialOverview = companyFinancialOverview;
    this.companyFinancialOverviewActivation = this.companyFinancialOverview.isActive ? 1 : 0;
  }
  handlecontactInfo(contactInfo:ContactInformationDto){
    this.contactInfo = contactInfo;
    this.contactInformationActivation = this.contactInfo.isActive ? 1 : 0;
  }

  handlecompanyProject(companyProject:CompanyProjectDto){
    this.companyProject = companyProject;
    this.companyFinancialOverviewActivation = this.companyProject.active ? 1 : 0;
  }

  tabViewChange(event, tabView: TabView) {
    debugger;
    this.headerValue = tabView.tabs[event.index].header;
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

  saveManagement(){
    if(this.headerValue == "Key Peoples")
      this.createOrUpdateCompanyManagement();
    if(this.headerValue == "Senior Management")
      this.createOrUpdateSeniorManagement();
    if(this.headerValue == "Auditors")
      this.createOrUpdateAuditors();
    if(this.headerValue == "Board Members")
      this.createOrUpdateBMembers();
    if(this.headerValue == "Branches")
      this.createOrUpdateBranches();
    if(this.headerValue == "Overview")
      this.createOrUpdateOverview();
    if(this.headerValue == "Contacts")
      this.createOrUpdateContacts();
    if(this.headerValue == "Projects")
      this.createOrUpdateCompanyProjects();
  }

  createOrUpdateCompanyManagement() {
    this.loading = true;
    this.management.isActive = this.managementActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateCompanyManagementByModel(this.management)
      .subscribe(
        res => {
          debugger;
          if (this.management.managementID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.management.chairman + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.management.chairman + ' created successfully',
              icon: 'success',
            });
          this.handleManagement(this.management);
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
  createOrUpdateSeniorManagement() {
    this.loading = true;
    this.seniorManagement.isActive = this.seniorManagementActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateSeniorManagementByModel(this.seniorManagement)
      .subscribe(
        res => {
          debugger;
          if (this.seniorManagement.seniorManagementID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.seniorManagement.title + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.seniorManagement.title + ' created successfully',
              icon: 'success',
            });
          this.handleseniorManagement(this.seniorManagement);
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
  createOrUpdateBMembers() {
    this.loading = true;
    this.boardMember.isActive = this.boardMemberActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateBMembersByModel(this.boardMember)
      .subscribe(
        res => {
          debugger;
          if (this.boardMember.boardMemberID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.boardMember.boardMember + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.boardMember.boardMember + ' created successfully',
              icon: 'success',
            });
          this.handleboardMember(this.boardMember);
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
  createOrUpdateAuditors() {
    this.loading = true;
    this.auditor.isActive = this.auditorActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateAuditorsByModel(this.auditor)
      .subscribe(
        res => {
          debugger;
          if (this.auditor.auditorID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.auditor.auditor + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.auditor.auditor + ' created successfully',
              icon: 'success',
            });
          this.handleauditor(this.auditor);
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
  createOrUpdateBranches() {
    this.loading = true;
    this.branch.isActive = this.branchActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateBranchesByModel(this.branch)
      .subscribe(
        res => {
          debugger;
          if (this.branch.branchID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.branch.branchName + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.branch.branchName + ' created successfully',
              icon: 'success',
            });
          this.handleBranch(this.branch);
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
  createOrUpdateOverview() {
    this.loading = true;
    this.companyFinancialOverview.isActive = this.companyFinancialOverviewActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateOverviewByModel(this.companyFinancialOverview)
      .subscribe(
        res => {
          debugger;
          if (this.companyFinancialOverview.overviewID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyFinancialOverview.employees + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyFinancialOverview.employees + ' created successfully',
              icon: 'success',
            });
          this.handlecompanyFinancialOverview(this.companyFinancialOverview);
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
  createOrUpdateContacts() {
    this.loading = true;
    this.contactInfo.isActive = this.contactInformationActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateContactsByModel(this.contactInfo)
      .subscribe(
        res => {
          debugger;
          if (this.contactInfo.contactInfoID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.contactInfo.branchName + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.contactInfo.branchName + ' created successfully',
              icon: 'success',
            });
          this.handlecontactInfo(this.contactInfo);
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
  createOrUpdateCompanyProjects() {
    this.loading = true;
    this.companyProject.active = this.companyProjectActivation == 1 ? true : false;
    this.companyManagmentService
      .createOrUpdateCompanyProjectsByModel(this.companyProject)
      .subscribe(
        res => {
          debugger;
          if (this.companyProject.projectID > 0)
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyProject.name + ' updated successfully',
              icon: 'success',
            });
          else
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyProject.name + ' created successfully',
              icon: 'success',
            });
          this.handlecompanyProject(this.companyProject);
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
