import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BatchAdminService, SearchBatches } from '@proxy/batch-admin';
import * as moment from 'moment';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batches-admin',
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
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputNumberModule,
    InputTextModule,],
  templateUrl: './batches-admin.component.html',
  styleUrl: './batches-admin.component.scss'
})
export class BatchesAdminComponent {
  batchadmindto = [];
  countries = [];
  entryusers = [];
  reentryusers = [];
  status = [];
  selectedBatchText: string;
  
  searchBatches: SearchBatches = {
    countryID: 0,
    reportType: '',
    source: '',
    aSource: '',
    statusID: 0,
    asofDate: "",
    entryUserID: 0,
    reEntryUserID: 0,
    remarks: '',
    aRemarks: '',
    uploadDate: '',
    esdFactID: 0,
    hijriDate: '',
    fileName: '',
    note: '',
    aNote: '',
    gbEntryUserId: '',
    gbReEntryUserId: '',
    batchText: '',
    batchID: 0
  };
   
    
  constructor(private batchAdminService: BatchAdminService) {

  }

  ngOnInit() {
    this.getStatusFinancialsByUserId();

    if (this.searchBatches.asofDate) {
      this.searchBatches.asofDate = moment(this.searchBatches.asofDate).format("MM/DD/YYYY");
    }
    
  }

  getStatusFinancialsByUserId() {

    this.batchAdminService.countriesForBatches().subscribe(res => {
      this.countries = res.countries;

      const entry = res.entryusers.filter(entryuser => entryuser.userType === 'Entry Operator');
      this.entryusers = entry;

      const rentry = res.entryusers.filter(entryuser => entryuser.userType === 'Re Entry Operator');
      this.reentryusers = rentry;


      this.status = res.adminStatus;
      console.warn(this.status);


    });
  }

  frequencyOptions: { label: string, value: string }[] = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' }
  ];
  selectedFrequency: string = '';
   onRadioChange() {
    this.searchBatches.reportType = this.selectedFrequency;
  }

  searchBatch() {
    this.batchAdminService.getBatchesEntryByBatchID(this.searchBatches.batchID).subscribe(res => {
      this.searchBatches = res[0]; // This will return a single SearchBatches object now.
      console.warn(this.searchBatches);

      this.selectedFrequency=this.searchBatches.reportType;

      this.selectedBatchText=this.searchBatches.batchText;
     

      this.searchBatches.asofDate = moment(this.searchBatches.asofDate).format("MM/DD/YYYY");
    });
  }
   

  async updateBatches(): Promise<void> {
    // Check if the searchBatches object is correctly loaded and batchID is not 0
    if (!this.searchBatches || !this.searchBatches.batchID) {
      console.error('Data not loaded or batchID is missing');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data not loaded or batchID is missing. Please check your data sources.',
        showConfirmButton: true
      });
      return;
    }
   
    try {
      this.searchBatches.asofDate = moment(this.searchBatches.asofDate).format();
      // Call service to update the batches and subscribe to the Observable
      this.batchAdminService.insertBatchesadminByList(this.searchBatches).subscribe(
        (response) => {
          // Success callback - This is where you handle the API response.
          console.log('API Response:', response);

          // Success notification
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: 'Updated successfully',
            icon: 'success',
          });
        },
        (error) => {
          // Error callback - Handle any errors that occur during the API call
          console.error('Error updating batches:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was an error updating the batches. Please try again later.',
            showConfirmButton: true
          });
        }
      );
    } catch (error) {
      // Log and show error message
      console.error('Unexpected error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an unexpected error. Please try again later.',
        showConfirmButton: true
      });
    }
}

  
  
  
  
  
}
