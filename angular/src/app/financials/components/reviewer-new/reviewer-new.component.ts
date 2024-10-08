import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfigStateService, PermissionService } from '@abp/ng.core';
import { Financial_ReviewerNew } from 'src/app/services/permissions';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { EntryService, StatusFinancialsDto } from '@proxy/entry';
import { ReviewerService } from '@proxy/reviewers';
import { FileService } from 'src/app/services/file/file.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reviewer-new',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,CalendarModule,ListboxModule,CommonModule,ThemeSharedModule,
    ImageModule,FileUploadModule,TabViewModule,CheckboxModule,RadioButtonModule,CommonModule ],
  templateUrl: './reviewer-new.component.html',
  styleUrl: './reviewer-new.component.scss'
})
export class ReviewerNewComponent {
  statusFinancials: any[]=[];
  statusFinancialsFilterData: any[]=[]
  financialEntryType:any;
  reportType:any;
  exportFile: number[] = [];
  loading = false;
  userId = "";
  reportSrc = "";
  statusFinanial:StatusFinancialsDto ={
    financialsID: 0,
    companyID: 0,
    newReviewFinancialID: 0,
    financialEntryTypeID: 0
  };
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor( 
    private permissionService: PermissionService,
    private config: ConfigStateService,
    private fileService: FileService,
    private reviewerService:ReviewerService){
   this.permission = {
     create: false,
     edit : false,
     delete  :false
   }
  }
  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Financial_ReviewerNew + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_ReviewerNew + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_ReviewerNew + '.delete')) {
      this.permission.delete = true;
    }
    const currentUser = this.config.getOne("currentUser");
    this.userId = currentUser.id;
    this.getStatusFinancialsByUserId();
  }

  getStatusFinancialsByUserId() {
    this.reviewerService.getStatusFinancialsByUserId(this.userId).subscribe(res => {
      this.statusFinancials = res;
      this.statusFinancialsFilterData = res;
    });
  }

  filterData(){
    if(this.financialEntryType == "0")
      this.statusFinancials = this.statusFinancialsFilterData;
    else 
    this.statusFinancials = this.statusFinancialsFilterData.filter(f => f.financialEntryTypeID == Number(this.financialEntryType))
  }

  generateReport(){
    this.loading = true;
    this.fileService.getReviewReport(43418).subscribe(res => {
      this.loading = false;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text:'Report genrated successfully', icon: 'success', });
      debugger;
      this.fileService.DocumentsDownload(res.filePath).subscribe(async (event) => {
        let data = event as HttpResponse < Blob > ;
        const downloadedFile = new Blob([data.body as BlobPart], {
            type: data.body?.type
        });
        console.log("ddd", downloadedFile)
        if (downloadedFile.type != "") {
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = res.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
        }
    });
    },
    error => {
      this.loading = false;
    },
    () => {
      this.loading = false;
    });
  }
}
