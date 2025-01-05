import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CorporateAnnouncementDto, CorporateAnnouncementService } from '@proxy/corporate-announcements';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgFor } from '@angular/common';
import { PermissionService } from '@abp/ng.core';
import { Company_Announcements } from 'src/app/services/permissions';
import * as moment from 'moment';

@Component({
  selector: 'app-announcements',
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
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  languageTypes = [];
  announcementTypes = [];
  corporateAnnouncements = [];
  corporateAnnouncementActivation!: number;
  corporateAnnouncement: CorporateAnnouncementDto = {
    companyID: 0,
    corporateAnnouncementID: 0,
    announcementTypeID: 0,
    gulfbaseID: 0,
    isActive: false
  };

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
    private commonService: CommonService,
    private corporateAnnouncementService: CorporateAnnouncementService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_Announcements + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Announcements + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_Announcements + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    this.getLangAnnouceTypes();
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
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID
    this.getStockMarketSectorsByStockMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
    });
  }

  getLangAnnouceTypes() {
    this.commonService.getLangAnnouceTypes().subscribe(res => {
      this.languageTypes = res.languageTypes;
      this.announcementTypes = res.announcementTypes;
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0) {
        if(!this.sectorID)
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
      }
      else this.loading = false;
    });
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getSectorCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res;
        if (this.companiesTickers.length > 0) {
          if(!this.companyID)
          this.companyID = this.companiesTickers[0].companyID;
          this.getCorporateAnnouncements();
        }
        else this.loading = false;
      });
  }

  getCorporateAnnouncements() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.corporateAnnouncementService
      .getCorporateAnnouncementsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.corporateAnnouncements = res;
        if (this.corporateAnnouncements.length > 0)
          this.handleCorporateAnnouncement(this.corporateAnnouncements[0]);
        else this.loading = false;
      });
  }

  handleCorporateAnnouncement(corporateAnnouncement: CorporateAnnouncementDto) {
    this.corporateAnnouncement = corporateAnnouncement;
    debugger;
    // this.corporateAnnouncement.announcedDateTime = this.corporateAnnouncement.announcedDate;
    this.corporateAnnouncementActivation = this.corporateAnnouncement.isActive ? 1 : 0;
    if(this.corporateAnnouncement.announcedDate)
      this.corporateAnnouncement.announcedDate = moment(this.corporateAnnouncement.announcedDate).format("MM/DD/YYYY")
    this.loading = false;
  }


  addNewCorporateAnnouncement() {
    this.corporateAnnouncement = {
      companyID: 0,
      corporateAnnouncementID: 0,
      announcementTypeID: 0,
      gulfbaseID: 0,
      isActive: false
    };
  }

  createOrUpdateCorporateAnnouncement() {
    debugger;
    this.loading = true;
    this.corporateAnnouncement.isActive = this.corporateAnnouncementActivation == 1 ? true : false;
    this.corporateAnnouncement.announcedDate = moment(this.corporateAnnouncement.announcedDate).format();
    // this.corporateAnnouncement.announcedDate = this.corporateAnnouncement.announcedDateTime;
    this.corporateAnnouncement.ticker = this.companiesTickers.find(f => f.companyID == this.companyID).ticker
    this.corporateAnnouncementService.createOrUpdateCorporateAnnouncementByModel(this.corporateAnnouncement).subscribe(res => {
      debugger;
      if (this.corporateAnnouncement.corporateAnnouncementID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.corporateAnnouncement.announcement + ' updated successfully', icon: 'success', });
        this.getCorporateAnnouncements();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.corporateAnnouncement.announcement + ' created successfully', icon: 'success', });

      }
      this.handleCorporateAnnouncement(this.corporateAnnouncement);

      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  deleteCorporateAnnouncement() {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Coreporate Announcement?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.corporateAnnouncementService.deleteCorporateAnnouncementByCorporateAnnouncementID(this.corporateAnnouncement.corporateAnnouncementID).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Coreporate Announcement Deleted Successfully',
            icon: 'success',
          }).then((result) => {
            this.getStockMarketSectorsByStockMarketID();
            this.loading = false;
          });

        });
      }
    })
  }
}


