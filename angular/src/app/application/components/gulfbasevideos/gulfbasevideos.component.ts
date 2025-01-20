import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GulfbaseVideo, GulfbaseVideoService } from '@proxy/gulfbase-videos';
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
import { Application_GulfBaseVideo } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gulfbasevideos',
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
  templateUrl: './gulfbasevideos.component.html',
  styleUrl: './gulfbasevideos.component.scss'
})
export class GulfbasevideosComponent {
  loading: boolean = false;

  gulfbasevideo: GulfbaseVideo = {
    id: 0,
    tag: '',
    width: 0,
    height: 0,
    isHome: false,
    sortOrder:0,
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
   gulfbaseVideos: GulfbaseVideo[] = [];
  constructor(private permissionService: PermissionService, private gulfbaseVideoService: GulfbaseVideoService) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Application_GulfBaseVideo + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GulfBaseVideo + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GulfBaseVideo + '.Delete')) {
      this.permission.delete = true;
    }
    this.getList();

  }

  save() {
    if (!this.gulfbasevideo.tag) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
      });
      return;
    }

    this.loading = true;

    // Here we call the GulfbaseVideoService to save the video
    this.gulfbaseVideoService.createOrUpdateGulfbaseVideoByVideo(this.gulfbasevideo).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Success!',
          text: 'Video saved successfully!',
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
  getList() {
    this.loading = true;
    this.gulfbaseVideoService.getGulfbaseVideo().subscribe(
      (response) => {
        this.loading = false;
        this.gulfbaseVideos = response; // Store the fetched videos in the gulfbaseVideos array
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
  editItem(item: GulfbaseVideo) {
    // Populate the form with the selected item's data
    this.gulfbasevideo = { ...item }; // Create a copy to avoid modifying the original directly
  }
  reset() {
    this.gulfbasevideo = {
      id: 0,
      tag: '',
      width: 0,
      height: 0,
      isHome: false,
      sortOrder:0,
    };
  }

}
