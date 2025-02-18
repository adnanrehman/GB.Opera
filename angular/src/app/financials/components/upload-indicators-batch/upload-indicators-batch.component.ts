import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ESDFactDto } from '@proxy/commons';
import { UploadBatchDto, UploadBatchService } from '@proxy/upload-batch';
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
import { TreeModule } from 'primeng/tree';
import Swal from 'sweetalert2';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-upload-indicators-batch',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    TreeModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputNumberModule,
    InputTextModule,
  ],
  templateUrl: './upload-indicators-batch.component.html',
  styleUrl: './upload-indicators-batch.component.scss',
})
export class UploadIndicatorsBatchComponent {
  loading = false;
  country:string="";
  esdFact:string="";
  batchadmindto = [];
  countries = [];
  entryusers = [];
  reentryusers = [];
  status = [];
  esdFacts: ESDFactDto[];
  selectedBatchText: string;
  uploadBatch: UploadBatchDto = {
    batchID: 0,
    countryID: 0,
    reportType:'',
    statusID: 1,
    esdFactID: 0,
  };

  frequencyOptions: { label: string, value: string }[] = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' }
  ];

  constructor(private uploadBatchService: UploadBatchService) {}

  ngOnInit() {
    this.getCountriesForBatches();

    if (this.uploadBatch.asofDate) {
      this.uploadBatch.asofDate = moment(this.uploadBatch.asofDate).format('MM/DD/YYYY');
    }
  }

  getCountriesForBatches() {
    this.uploadBatchService.countriesForBatches().subscribe(res => {
      this.countries = res.countries;

      const entry = res.entryusers.filter(entryuser => entryuser.userType === 'Entry Operator');
      this.entryusers = entry;

      const rentry = res.entryusers.filter(entryuser => entryuser.userType === 'Re Entry Operator');
      this.reentryusers = rentry;
      this.status = res.adminStatus;
      console.warn(this.status);
    });
  }

  fetchData(): void {
    if (this.country == "") {
      console.error('Please select any Country');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select any Country',
        showConfirmButton: true,
      });
      return;
    }
    this.loading = true;
    this.uploadBatchService.getCountriesFactsTitlesByCountry(this.country).subscribe(res => {
       

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.esdFacts = res.map(item => {
        let newItem = {
          ...item,
          label: item.esdFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          key:item.esdFact || '',
          expanded:item.parentID == -1 ? true : false,
          children: []
        };
        idMap[newItem.esdFactID] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.esdFacts.forEach(item => {
        debugger;
        if(item.parentID === 0){
          treeData.push(item);
        }else{
          let parentItem = idMap[item.parentID];
            if (parentItem) {
              parentItem.children.push(item);
              item = parentItem;
            } else {
              console.error(`Parent id ${item.parentID} not found in idMap.`);
            }
        }
        
      });

      // Assign the final tree data to gbFactListDto
      this.esdFacts = treeData;
      console.log('Tree Data:', this.esdFacts);
      this.loading = false;
    });
  }

  onNodeClick(event: any) {
    // Handle single click logic here
    console.log('Node clicked:', event);
   
    
     this.uploadBatch.esdFactID = event.node.esdFactID;
     this.esdFact = event.node.esdFact;

    
   
  }
  async uploadBatches(): Promise<void> {
    // Check if the searchBatches object is correctly loaded and batchID is not 0
    if (!this.uploadBatch || !this.uploadBatch.esdFactID) {
      console.error('Please add the ESD fact');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add the ESD fact.',
        showConfirmButton: true,
      });
      return;
    }

    if (!this.uploadBatch || !this.uploadBatch.hijriDate) {
      console.error('Please add the Hijri Date');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add the Hijri Date',
        showConfirmButton: true,
      });
      return;
    }

    try {
      debugger;
      this.loading =true;
      // this.uploadBatch.asofDate = moment(this.uploadBatch.asofDate).format();
      this.uploadBatch.countryID = this.countries.find(f => f.abbr == this.country).countryID;
      // Call service to update the batches and subscribe to the Observable
      this.uploadBatchService.insertBatchByInput(this.uploadBatch).subscribe(
        response => {
          // Success callback - This is where you handle the API response.
          console.log('API Responses:', response);

          // Success notification
          Swal.fire({
            toast: true,
            position: 'top-end', 
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: 'Saved successfully',
            icon: 'success',
          });
          this.uploadBatch= {
            batchID: 0,
            countryID: 0,
            reportType:'',
            statusID: 1,
            esdFactID: 0,
          };
          this.loading =false;
        },
        error => {
          // Error callback - Handle any errors that occur during the API call
          console.error('Error updating batches:', error);
          this.loading =false;
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'There was an error updating the batches. Please try again later.',
          //   showConfirmButton: true,
          // });
        }
      );
    } catch (error) {
      // Log and show error message
      console.error('Unexpected error:', error);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'There was an unexpected error. Please try again later.',
      //   showConfirmButton: true,
      // });
    }
  }
}
