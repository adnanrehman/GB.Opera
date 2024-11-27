import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabView, TabViewModule } from 'primeng/tabview';
import {
  AuditorDto,
  BoardMemberDto,
  BranchDto,
  CompanyFinancialOverviewDto,
  CompanyManagementDto,
  CompanyManagmentService,
  CompanyProjectDto,
  ContactInformationDto,
  ManagementDto,
  ProjectStatusDto,
  SeniorManagementDto,
} from '@proxy/company-managements';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { FinancialsAdminComponent } from 'src/app/financials/components/financials-admin/financials-admin.component';
import { PermissionService } from '@abp/ng.core';
import { Company_Management } from 'src/app/services/permissions';
import * as moment from 'moment';

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
  headerValue: any;
  selectedItem: any;
  suggestions: any[] = [];
  sectorID: number;
  clickedIndex = 0;
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
  management: ManagementDto = {
    managementID: 0,
    companyID: 0,
    isActive: false,
  };
  seniorManagement: SeniorManagementDto = {
    seniorManagementID: 0,
    companyID: 0,
  };
  boardMember: BoardMemberDto = {
    boardMemberID: 0,
    companyID: 0,
  };
  auditor: AuditorDto = {
    auditorID: 0,
    companyID: 0,
  };
  branch: BranchDto = {
    branchID: 0,
    companyID: 0,
    isActive: false,
  };
  companyFinancialOverview: CompanyFinancialOverviewDto = {
    overviewID: 0,
    companyID: 0,
    isActive: false,
  };
  contactInfo: ContactInformationDto = {
    contactInfoID: 0,
    companyID: 0,
  };
  companyProject: CompanyProjectDto = {
    projectID: 0,
    companyID: 0,
    projectStatusID: 0,
    active: false,
  };
  projectStatus: ProjectStatusDto = {
    projectStatusID: 0,
  };
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
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];

  markets = [
    { name: 'TASI' },
    { name: 'ReactJS' },
    { name: 'Angular' },
    { name: 'Bootstrap' },
    { name: 'PrimeNG' },
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private companyManagmentService: CompanyManagmentService , private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_Management + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Management + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Management + '.delete')) {
      this.permission.delete = true;
    }
    this.getMarketLangAnnouncements();
    // this.stockMarketID = 0;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading =true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading =false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading =true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getCompMarketSectorsByMarketID();
    this.loading =false;
  }

  getMarketLangAnnouncements() {
    this.commonService.getMarketLangAnnouncements().subscribe(res => {
      this.marketLangAnnouncement = res;
      if (this.marketLangAnnouncement.length > 0) this.stockMarketID = this.marketLangAnnouncement[0].stockMarketID; this.getCompMarketSectorsByMarketID();
    });
  }

  getCompMarketSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMarketSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0){
        if(!this.sectorID)
          this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getCompaniesTickersBySectorIDAndMarketID();
      } 
      else this.loading = false;
    });
  }

  getCompaniesTickersBySectorIDAndMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getCompaniesTickersBySectorIDAndMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0){
          if(!this.companyID)
          this.companyID = this.companiesTickers[0].companyID;
          this.getCompanyManagements();
        } 
        else this.loading = false;
      });
  }

  getCompanyManagements() {
    debugger;
    this.loading = true;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companyManagmentService
      .getCompaniesManagementByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.companyManagements = res;
        if (this.companyManagements.managements.length > 0)
          this.handleCompanyManagement(this.companyManagements);
        else this.loading = false;
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
    if (this.managements.length > 0) this.handleManagement(this.managements[0]);
    else this.addNewManagement;
    if (this.seniorManagements.length > 0) this.handleseniorManagement(this.seniorManagements[0]);
    else this.addNewManagement;
    if (this.boardMembers.length > 0) this.handleboardMember(this.boardMembers[0]);
    else this.addNewManagement;
    if (this.auditors.length > 0) this.handleauditor(this.auditors[0]);
    else this.addNewCompanyManagement;
    if (this.branches.length > 0) this.handleBranch(this.branches[0]);
    else this.addNewCompanyManagement;
    if (this.companyFinancialOverviews.length > 0) this.handlecompanyFinancialOverview(this.companyFinancialOverviews[0]);
    else this.addNewCompanyManagement;
    if (this.contactInformations.length > 0) this.handlecontactInfo(this.contactInformations[0]);
    else this.addNewCompanyManagement;
    if (this.companyProjects.length > 0) this.handlecompanyProject(this.companyProjects[0]);
    else this.addNewCompanyManagement;
    this.loading = false;
  }

  handleManagement(management: ManagementDto) {
    this.management = management;
    this.managementActivation = this.management.isActive ? 1 : 0;
    if(this.headerValue == undefined)
      this.headerValue = 'Key Peoples';
  }
  handleseniorManagement(seniorManagement: SeniorManagementDto) {
    this.seniorManagement = seniorManagement;
    this.seniorManagementActivation = this.seniorManagement.isActive ? 1 : 0;
  }
  handleboardMember(boardMember: BoardMemberDto) {
    this.boardMember = boardMember;
    this.boardMemberActivation = this.boardMember.isActive ? 1 : 0;
    if(this.boardMember.since)
      this.boardMember.since = moment(this.boardMember.since).format("MM/DD/YYYY")
    if(this.boardMember.till)
      this.boardMember.till = moment(this.boardMember.till).format("MM/DD/YYYY")
  }
  handleauditor(auditor: AuditorDto) {
    this.auditor = auditor;
    this.auditorActivation = this.auditor.isActive ? 1 : 0;
  }
  handleBranch(branch: BranchDto) {
    this.branch = branch;
    this.branchActivation = this.branch.isActive ? 1 : 0;
  }
  handlecompanyFinancialOverview(companyFinancialOverview: CompanyFinancialOverviewDto) {
    this.companyFinancialOverview = companyFinancialOverview;
    this.companyFinancialOverviewActivation = this.companyFinancialOverview.isActive ? 1 : 0;
  }
  handlecontactInfo(contactInfo: ContactInformationDto) {
    this.contactInfo = contactInfo;
    this.contactInformationActivation = this.contactInfo.isActive ? 1 : 0;
  }

  handlecompanyProject(companyProject: CompanyProjectDto) {
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

  saveManagement() {
    if (this.companyID == undefined) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'error!',
        text: 'Please select first any Company',
        icon: 'error',
      });
    }
    if (this.headerValue == 'Key Peoples') this.createOrUpdateCompanyManagement();
    if (this.headerValue == 'Senior Management') this.createOrUpdateSeniorManagement();
    if (this.headerValue == 'Auditors') this.createOrUpdateAuditors();
    if (this.headerValue == 'Board Members') this.createOrUpdateBMembers();
    if (this.headerValue == 'Branches') this.createOrUpdateBranches();
    if (this.headerValue == 'Overview') this.createOrUpdateOverview();
    if (this.headerValue == 'Contacts') this.createOrUpdateContacts();
    if (this.headerValue == 'Projects') this.createOrUpdateCompanyProjects();
  }

  addNewManagement() {
    if (this.headerValue == 'Key Peoples') {
      this.management = {
        managementID: 0,
        companyID: 0,
        isActive: false,
      };
    }
    if (this.headerValue == 'Senior Management') {
      this.seniorManagement = {
        seniorManagementID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Auditors') {
      this.auditor = {
        auditorID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Board Members') {
      this.boardMember = {
        boardMemberID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Branches') {
      this.branch = {
        branchID: 0,
        companyID: 0,
        isActive: false,
      };
    }
    if (this.headerValue == 'Overview') {
      this.companyFinancialOverview = {
        overviewID: 0,
        companyID: 0,
        isActive: false,
      };
    }
    if (this.headerValue == 'Contacts') {
      this.contactInfo = {
        contactInfoID: 0,
        companyID: 0,
      };
    }
    if (this.headerValue == 'Projects') {
      this.companyProject = {
        projectID: 0,
        companyID: 0,
        projectStatusID: 0,
        active: false,
      };
    }
  }

  createOrUpdateCompanyManagement() {
    this.loading = true;
    this.management.isActive = this.managementActivation == 1 ? true : false;
    if (this.management.companyID == 0) this.management.companyID = this.companyID;
    this.companyManagmentService.createOrUpdateCompanyManagementByModel(this.management).subscribe(
      res => {
        debugger;
        if (this.management.managementID > 0) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.management.chairman + ' updated successfully',
            icon: 'success',
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.management.chairman + ' created successfully',
            icon: 'success',
          });
          this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.managements = res.managements;
            });
        }

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
    if (this.seniorManagement.companyID == 0) this.seniorManagement.companyID = this.companyID;
    this.companyManagmentService
      .createOrUpdateSeniorManagementByModel(this.seniorManagement)
      .subscribe(
        res => {
          debugger;
          if (this.seniorManagement.seniorManagementID > 0){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.seniorManagement.title + ' updated successfully',
              icon: 'success',
            });
          }
          else{
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.seniorManagement.title + ' created successfully',
              icon: 'success',
            });
            this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.seniorManagements = res.seniorManagements;
            });
          }
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
    this.boardMember.since = moment(this.boardMember.since).format();
    this.boardMember.till = moment(this.boardMember.till).format();
    if (this.boardMember.companyID == 0) this.boardMember.companyID = this.companyID;
    this.companyManagmentService.createOrUpdateBMembersByModel(this.boardMember).subscribe(
      res => {
        debugger;
        if (this.boardMember.boardMemberID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.boardMember.boardMember + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.boardMember.boardMember + ' created successfully',
            icon: 'success',
          });
          this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.boardMembers = res.boardMembers;
            });
        }
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
    if (this.auditor.companyID == 0) this.auditor.companyID = this.companyID;
    this.companyManagmentService.createOrUpdateAuditorsByModel(this.auditor).subscribe(
      res => {
        debugger;
        if (this.auditor.auditorID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.auditor.auditor + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.auditor.auditor + ' created successfully',
            icon: 'success',
          });
          this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.auditors = res.auditors;
            });
        }
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
    if (this.branch.companyID == 0) this.branch.companyID = this.companyID;
    this.companyManagmentService.createOrUpdateBranchesByModel(this.branch).subscribe(
      res => {
        debugger;
        if (this.branch.branchID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.branch.branchName + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.branch.branchName + ' created successfully',
            icon: 'success',
          });
          this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.branches = res.branches;
            });
        }
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
    this.companyFinancialOverview.isActive =
      this.companyFinancialOverviewActivation == 1 ? true : false;
    if (this.companyFinancialOverview.companyID == 0)
      this.companyFinancialOverview.companyID = this.companyID;
    this.companyManagmentService
      .createOrUpdateOverviewByModel(this.companyFinancialOverview)
      .subscribe(
        res => {
          debugger;
          if (this.companyFinancialOverview.overviewID > 0){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyFinancialOverview.employees + ' updated successfully',
              icon: 'success',
            });
          }
          else{
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyFinancialOverview.employees + ' created successfully',
              icon: 'success',
            });
            this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.companyFinancialOverviews = res.companyFinancialOverviews;
            });
          }
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
    if (this.contactInfo.companyID == 0) this.contactInfo.companyID = this.companyID;
    this.companyManagmentService.createOrUpdateContactsByModel(this.contactInfo).subscribe(
      res => {
        debugger;
        if (this.contactInfo.contactInfoID > 0){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.contactInfo.branchName + ' updated successfully',
            icon: 'success',
          });
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: this.contactInfo.branchName + ' created successfully',
            icon: 'success',
          });
          this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.contactInformations = res.contactInformations;
            });
        }
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
    this.companyProject.projectStatus = "New"
    if (this.companyProject.companyID == 0) this.companyProject.companyID = this.companyID;
    this.companyManagmentService
      .createOrUpdateCompanyProjectsByModel(this.companyProject)
      .subscribe(
        res => {
          debugger;
          if (this.companyProject.projectID > 0){
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyProject.name + ' updated successfully',
              icon: 'success',
            });
          }
          else{
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: this.companyProject.name + ' created successfully',
              icon: 'success',
            });
            this.companyManagmentService
            .getCompaniesManagementByCompanyID(this.companyID)
            .subscribe(res => {
              this.companyProjects = res.companyProjects;
            });
          }
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
