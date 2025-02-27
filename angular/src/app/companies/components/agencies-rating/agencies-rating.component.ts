import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AgencyDto, AgencyRatingDto, AgencyRatingService, RatingDto } from '@proxy/agency-ratings';
import { CommonService } from '@proxy/commons';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { PermissionService } from '@abp/ng.core';
import { Company_AgenciesRating } from 'src/app/services/permissions';

@Component({
  selector: 'app-agencies-rating',
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
    RadioButtonModule,
    InputTextModule,
    TabViewModule, TreeModule
  ],
  templateUrl: './agencies-rating.component.html',
  styleUrl: './agencies-rating.component.scss'
})
export class AgenciesRatingComponent {
  loading: boolean = false;
  isCredit: any;
  agencies: AgencyDto[];
  ratings: RatingDto[];
  agency: AgencyDto = {
    agencyId: 0,
    isCredit: false
  }
  rating: RatingDto = {
    ratingId: 0,
    isCredit: false
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private agencyRatingService: AgencyRatingService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_AgenciesRating + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_AgenciesRating + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_AgenciesRating + '.delete')) {
      this.permission.delete = true;
    }
    this.getAgencyRatingsByIsCredit();
  }

  getAgencyRatingsByIsCredit() {
    this.loading = true;
    this.commonService.getAgencyRatingsByIsCredit(this.isCredit).subscribe(res => {
      this.agencies = res.agencies;
      this.ratings = res.ratings;
      if (this.agencies.length > 0) this.handleAgency(this.agencies[0]);
      if (this.ratings.length > 0) this.handlerating(this.ratings[0]);
      this.loading = false;
    });
  }
  

  handleAgency(agency: AgencyDto) {
    // this.agency = agency;
  }

  handlerating(rating: RatingDto) {
    // this.rating = rating;
  }

  addNewAgency() {
    this.agency = {
      agencyId: 0,
      isCredit: false
    }
  }

  addNewRating() {
    this.rating = {
      ratingId: 0,
      isCredit: false
    }
  }

  createOrUpdateRating() {
    debugger;
    this.loading = true;
    this.agency.isCredit = this.isCredit == "true" ? true : false;
    this.agencyRatingService.createOrUpdateRatingByInput(this.rating).subscribe(res => {
      debugger;
      if (this.rating.ratingId > 0)
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.rating.rating + ' updated successfully', icon: 'success', });
      else
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.rating.rating + ' created successfully', icon: 'success', });
      this.isCredit = this.agency.isCredit;
      this.getAgencyRatingsByIsCredit();
      this.rating = {
        ratingId: 0,
        isCredit: false
      }
      this
      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  createOrUpdateAgency() {
    debugger;
    this.loading = true;
    this.agency.isCredit = this.isCredit == "true" ? true : false;
    this.agencyRatingService.createOrUpdateAgencyByInput(this.agency).subscribe(res => {
      debugger;
      if (this.agency.agencyId > 0)
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.agency.agency + ' updated successfully', icon: 'success', });
      else
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.agency.agency + ' created successfully', icon: 'success', });
      this.isCredit = this.agency.isCredit;
      this.getAgencyRatingsByIsCredit();
      this.agency = {
        agencyId: 0,
        isCredit: false
      }
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
