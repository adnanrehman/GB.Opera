import { PermissionService, ConfigStateService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchesReEntry } from '@proxy';
import {
  BatchesESDFactsMappingDto,
  BatchesReEntryDto,
  BatchesReEntryService,
} from '@proxy/batches-re-entry';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { Financial_BatchesReEntry, Financial_Entry } from 'src/app/services/permissions';

@Component({
  selector: 'app-batches-re-entry',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ListboxModule,
    CommonModule,
    ThemeSharedModule,
    ImageModule,
    FileUploadModule,
    TabViewModule,
    CheckboxModule,
    RadioButtonModule,
    CommonModule,
    InputNumberModule,
    InputTextModule,
  ],
  templateUrl: './batches-re-entry.component.html',
  styleUrl: './batches-re-entry.component.scss',
})
export class BatchesReEntryComponent {
  batchesReEntries: any[];
  ESDFactsMapping: BatchesESDFactsMappingDto[] = [];
  loading = false;
  batchesReEntry: BatchesReEntryDto = {
    batchID: 0,
    countryID: 0,
    statusID: 0,
  };
  userId = '';
  permission: {
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  constructor(
    private permissionService: PermissionService,
    private config: ConfigStateService,
    private batchesReEntryService: BatchesReEntryService
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false,
    };
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Financial_BatchesReEntry + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_BatchesReEntry + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_BatchesReEntry + '.Delete')) {
      this.permission.delete = true;
    }
    const currentUser = this.config.getOne('currentUser');
    this.userId = currentUser.id;
    this.getBatchesReEntryByUserId();
  }

  getBatchesReEntryByUserId() {
    this.batchesReEntryService.getBatchesReEntryByUserId(this.userId).subscribe(res => {
      this.batchesReEntries = res;
    });
  }

  getBatchesForReEntryByBatchID() {
    this.batchesReEntryService.getBatchesForReEntryByBatchID(this.batchesReEntry.batchID).subscribe(res => {
      this.ESDFactsMapping = res;
    });
  }
}
