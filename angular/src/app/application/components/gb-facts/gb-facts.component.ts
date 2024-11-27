import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GbFactsAccountDetailComponent } from './gb-facts-account-detail/gb-facts-account-detail.component';
import { TreeModule } from 'primeng/tree';
import { Myinterface } from 'src/app/myinterface';
import { GbFactService } from '@proxy/gb-facts/gb-fact.service';
import { GbFactListDto } from '@proxy/gb-facts/models';
import { SignalNode } from '@angular/core/primitives/signals';
import { PermissionService } from '@abp/ng.core';
import { Application_GbFacts } from 'src/app/services/permissions';
import { CommonModule, NgIf } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';


@Component({
  selector: 'app-gb-facts',
  standalone: true,
  imports: [TreeModule,ThemeSharedModule,CommonModule,NgIf],
  templateUrl: './gb-facts.component.html',
  styleUrl: './gb-facts.component.scss'
})
export class GbFactsComponent {

  data: TreeNode[];
  loading = false;
  cols: any[];
  ref!: DynamicDialogRef;
  treeData = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  createPermission: boolean = false;

  myinterface: Myinterface[];
  gbFactListDto: GbFactListDto[]
  constructor(private dialogService: DialogService, private gnfactservice: GbFactService, private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
  }



  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.loading = true;
    this.gnfactservice.getAllFactsMappings().subscribe(res => {
       

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.gbFactListDto = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          expanded:item.parentId == -1 ? true : false,
          children: []
        };
        idMap[newItem.gbFactID] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.gbFactListDto.forEach(item => {
        if(item.parentId === -1){
          treeData.push(item);
        }else{
          let parentItem = idMap[item.parentId];
            if (parentItem) {
              parentItem.children.push(item);
              item = parentItem;
            } else {
              console.error(`Parent id ${item.parentId} not found in idMap.`);
            }
        }
        
      });

      // Assign the final tree data to gbFactListDto
      this.gbFactListDto = treeData;
      console.log('Tree Data:', this.gbFactListDto);
      this.loading = false;
    });
  }


  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_GbFacts + '.delete')) {
      this.permission.delete = true;
    }
    this.fetchTreeData();
   
   

  }

  addAccount(obj: any) {
    debugger;
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Add Account',
      data: {
        obj: obj,
        text: "Add Account",
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
    debugger;
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
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

  findItemById(items: any[], gbFactID: number): number | null {
    for (const item of items) {
      if (item.gbFactID === gbFactID) {
        return item; // Return the ID if the name matches
      }

      // If the item has children, search recursively
      if (item.children) {
        const foundId = this.findItemById(item.children, gbFactID);
        if (foundId !== null) {
          return foundId; // Return the ID if found in children
        }
      }
    }
    return null; // Return null if no match is found
  }

  onNodeClick(event: any) {
    // Handle single click logic here
    console.log('Node clicked:', event);
   
    
     
    if(event.node.parentId != -1){
      const element = event.originalEvent.currentTarget; 
      element.addEventListener('dblclick', () => {
        this.editHeader(event);
      });
        
    }

    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
    }
    
   
  }


 
}
