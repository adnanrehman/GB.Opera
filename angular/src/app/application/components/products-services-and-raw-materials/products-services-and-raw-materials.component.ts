import { PermissionService } from '@abp/ng.core';
 
import { CommonModule, NgIf } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcductServiceRaw } from '@proxy/product-service-raw';
import { ProductServiceService } from '@proxy/product-service-raw/product-service.service';
 
import { TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Application_ProductsServicesAndRawMaterials } from 'src/app/services/permissions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsServicesAndRawMaterialsdetailsComponent } from '../../products-services-and-raw-materials/products-services-and-raw-materialsdetails/products-services-and-raw-materialsdetails.component';

@Component({
  selector: 'app-products-services-and-raw-materials',
  standalone: true,
  imports: [TableModule,AutoCompleteModule, FormsModule,DropdownModule,
    CalendarModule,ImageModule,FileUploadModule,TabViewModule,TreeModule,CommonModule,ThemeSharedModule,CommonModule,NgIf ],
  templateUrl: './products-services-and-raw-materials.component.html',
  styleUrl: './products-services-and-raw-materials.component.scss'
})
export class ProductsServicesAndRawMaterialsComponent {
  data:TreeNode[];
  cols: any[];
  ref!: DynamicDialogRef;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
 procductServiceRawDto: ProcductServiceRaw[]
 loading = false;
  constructor(  private permissionService: PermissionService,
    private productservic : ProductServiceService,private dialogService: DialogService,private renderer: Renderer2) {
   
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
 
    
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_ProductsServicesAndRawMaterials + '.Delete')) {
      this.permission.delete = true;
    }
    this.fetchTreeData();
   
    
  }
  fetchTreeData(): void {
    debugger; // For debugging purposes
   // this.loading = true;
    this.productservic.getAllProcductServiceRaw().subscribe(res => {
       

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.procductServiceRawDto = res.map(item => {
        let newItem = {
          ...item,
          label: item.name || '', // Assign gbFact to label or default to empty string
          parent: null,
          key:item.name || '',
          expanded:item.parentID == -1 ? true : false,
          children: []
        };
        idMap[newItem.productServiceRawID] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.procductServiceRawDto.forEach(item => {
        if(item.parentID === -1){
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
      this.procductServiceRawDto = treeData;
      console.log('Tree Data:', this.procductServiceRawDto);
     // this.loading = false;
    });
  }

  onNodeClick(event: any) {
    console.log('Node clicked:', event);
  
    const targetElement = event.originalEvent?.target; // Use target to get the clicked element
    console.log('Resolved Element:', targetElement);
  
    if (targetElement && targetElement instanceof HTMLElement) {
      console.log('Attaching dblclick listener to:', targetElement);
  
      // Attach dblclick listener to the target element
      this.renderer.listen(targetElement, 'dblclick', () => {
        console.log('dblclick detected on:', targetElement);
        this.editHeader(event);
      });
    } else {
      console.error('Element not found for dblclick listener');
    }
  
    if (event.originalEvent?.ctrlKey || event.originalEvent?.metaKey) {
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
    }
  }
  
  
  
  
  
  addAccount(obj: any) {
    debugger;
    this.ref = this.dialogService.open(ProductsServicesAndRawMaterialsdetailsComponent, {
      header: 'Add Product Service and Raw Meterials',
      data: {
        obj: obj,
        text: "Add Product Service and Raw Meterials",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      if(template)
        this.fetchTreeData();
    });

  }

  editHeader(obj: any) {
   
    this.ref = this.dialogService.open(ProductsServicesAndRawMaterialsdetailsComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
        text: "Edit Account",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      if(template){
        this.fetchTreeData();
      }
    });
  }
}
