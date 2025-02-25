import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSourceDto, NewSourceService } from '@proxy/new-sources';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { News_Source } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-source',
  standalone: true,
  imports: [CommonModule,
    NgFor,
    NgIf,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    DialogModule,
    FileUploadModule,
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule],
  templateUrl: './new-source.component.html',
  styleUrl: './new-source.component.scss'
})
export class NewSourceComponent {

  loading: boolean = false;

  newsourcedto: NewSourceDto = {
    sourceID: 0,
    source: '',
    aSource: '',
    isEnglish: false,

  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  newsource: NewSourceDto[] = [];

  constructor(private permissionService: PermissionService, private newsourceService: NewSourceService) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(News_Source + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Source + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(News_Source + '.Delete')) {
      this.permission.delete = true;
    }
     this.getList();

  }
  reset() {
    this.newsourcedto = {
      sourceID: 0,
      source: '',
      aSource: '',
      isEnglish: false,

    };
  }
  editItem(item: NewSourceDto) {
    // Populate the form with the selected item's data
    this.newsourcedto = { ...item }; // Create a copy to avoid modifying the original directly
  }

   getList() {
      this.loading = true;
      this.newsourceService.getNewSource().subscribe(
        (response) => {
          this.loading = false;
          this.newsource = response; // Store the fetched videos in the gulfbaseVideos array
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Error!',
            text: 'Error fetching Gulfbase videos.',
            icon: 'error',
          });
        }
      );
    }

    save() {
        
    
        this.loading = true;
    
        // Here we call the GulfbaseVideoService to save the video
        this.newsourceService.saveUpdateBySource(this.newsourcedto).subscribe(
          (response) => {
            this.loading = false;
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Success!',
              text: 'New Source saved successfully!',
              icon: 'success',
            });
    
            this.reset();  // Reset form to its initial state
    
            // Refresh the list after saving
            this.getList();
            
          },
          (error) => {
            this.loading = false;
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              title: 'Error!',
              text: 'Error saving video.',
              icon: 'error',
            });
          }
        );
      }
}
