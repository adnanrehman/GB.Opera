
import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchesEntryService } from '@proxy/batches-entry/batches-entry';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batches-entry',
  standalone: true,
  imports: [TableModule, AutoCompleteModule, FormsModule, DropdownModule, CalendarModule, ListboxModule, CommonModule, ThemeSharedModule,
    ImageModule, FileUploadModule, TabViewModule, CheckboxModule, RadioButtonModule, CommonModule, InputNumberModule],
  templateUrl: './batches-entry.component.html',
  styleUrl: './batches-entry.component.scss'
})
export class BatchesEntryComponent {
  userId = "";
  statusFinancials: any[] = [];
  batcheslist: any[] = [];
  ESDFactsMappings: any[] = [];
  loading: boolean = false;
  BatchesEntries: any[] = [];
  selectedBatchId: number;

  constructor(private permissionService: PermissionService,
    private config: ConfigStateService, private batchesEntryService: BatchesEntryService) {

  }

  ngOnInit() {

    const currentUser = this.config.getOne("currentUser");
    this.userId = currentUser.id;
    this.getStatusFinancialsByUserId();
  }
  getStatusFinancialsByUserId() {
      this.loading = true;
    this.batchesEntryService.getBatchesEntryByUserId(this.userId).subscribe(res => {
      this.statusFinancials = res;

        this.loading = false;
    });
  }
  getbatchbyid(batchId: number) {

    const filteredBatches = this.statusFinancials.filter(financial => financial.batchID == batchId);
    ;
    this.batcheslist = filteredBatches;


    const selectedBatch = this.batcheslist[0];  // Assuming you're interested in the first item (modify as needed)
    const batchID = selectedBatch.batchID;
    const batchESDfactID = selectedBatch.esdFactID;  // Make sure this property exists in the object

    // Pass batchID and batchESDfactID to the getindicators function
    this.getindicators(batchID, batchESDfactID);


  }
  getindicators(batchID: number, batchESDfactID: number) {
    this.loading = true;
    this.batchesEntryService.getESDFactsMappingsYearlyByBatchIDAndBatchESDfactID(batchID, batchESDfactID).subscribe(res => {
      this.ESDFactsMappings = res;

   this.loading = false;
    });
  }

  async updateBatches(): Promise<void> {
    this.loading = true
    if (!this.batcheslist || !this.ESDFactsMappings) {
      console.error('Data not loaded');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data not loaded. Please check your data sources.',
        showConfirmButton: true
      });
      return;
    }
  
    // Create batchesToUpdate by iterating through both lists
    const batchesToUpdate = [];
    
    for (let i = 0; i < this.ESDFactsMappings.length; i++) {
      const batch = this.batcheslist[0];  // Single batch object
      const esdFact = this.ESDFactsMappings[i];  // Corresponding ESDFact
      
      batchesToUpdate.push({
        batchid: batch.batchID,
        remarks: batch.remarks,
        batchDetailID: esdFact ? esdFact.batchDetailID : null,
        esdFactID: esdFact ? esdFact.esdFactID : null,
        parentID: esdFact ? esdFact.parentID : null,
        isTitle: esdFact ? esdFact.isTitle : null,
        value: esdFact ? esdFact.value : null,
        aremarks: batch.aRemarks
      });
    
      console.log(`Batch ${i + 1} added:`, batchesToUpdate[i]);
    }
  
    try {
      // Send the full list to the service for batch updates
      const response = await this.batchesEntryService.insertBatchesEntriesByList(batchesToUpdate).toPromise();
      
      this.loading = false
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Success!',
        text: 'Updated successfully',
        icon: 'success',
      });
    } catch (error) {
      // Show error alert in case of failure
      console.error('Error updating batches:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error updating the batches. Please try again later.',
        showConfirmButton: true
      });
    }
}

  
  
  
  
  
  
   
  

}
