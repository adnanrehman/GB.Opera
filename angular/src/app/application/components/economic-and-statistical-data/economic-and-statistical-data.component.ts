
import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { EconomicAndStatisticalDataAccountDetailComponent } from './economic-and-statistical-data-account-detail/economic-and-statistical-data-account-detail.component';
import { TreeNode } from 'primeng/api';
import { PermissionService } from '@abp/ng.core';
import { Application_EconomicAndStatisticalData } from 'src/app/services/permissions';
import { EconomicAndStateFactService } from '@proxy/economic-and-state-facts';
import { ESDFactsMappings } from '@proxy/batches-entry';
import { ESDFactDto } from '@proxy/commons';
@Component({
  selector: 'app-economic-and-statistical-data',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './economic-and-statistical-data.component.html',
  styleUrl: './economic-and-statistical-data.component.scss'
})
export class EconomicAndStatisticalDataComponent {
  data: TreeNode[]; 
  loading:boolean=false;
  esdFactsMappings: ESDFactDto[] = [];
  ref!: DynamicDialogRef;
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(private dialogService: DialogService, private permissionService: PermissionService,
    private economicAndStateFactService:EconomicAndStateFactService
    
  ) {
    
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
    
  }

  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(Application_EconomicAndStatisticalData + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_EconomicAndStatisticalData + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_EconomicAndStatisticalData + '.delete')) {
      this.permission.delete = true;
    }
    this.fetchgbOwnerShipTreeData();
  }

  fetchgbOwnerShipTreeData(): void {
    this.loading = true;
    this.economicAndStateFactService.getAllESDFactMappings().subscribe(res => {
      console.log('Tree res:', res);

      let idMap = {};
      this.esdFactsMappings = res.map(item => {
        let newItem = {
          ...item,
          label: item.esdFact || '',
          parent: null,
          Tooltip: item.aesdFact,
          children: [],
        };
        idMap[newItem.esdFactID] = newItem;
        return newItem;
      });

      let treeData = [];
      this.esdFactsMappings.forEach(item => {
        if (item.parentID === 0) {
          treeData.push(item);
        } else {
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
      this.esdFactsMappings = treeData;
      console.log('Tree Data:', this.esdFactsMappings);
      this.loading = false;
    });
  }

  onNodeClick(event: any) {
    console.log('Node clicked:', event.node);
    debugger;
  
    const node = event.node;
    const parentId = node.parentID;
  
    console.log('Immediate Parent ID:', parentId);
  
    const parentNode = this.findNodeById(node, parentId);
    console.log('Parent Node:', parentNode);
  
    // Safely get grandparent's parentID (i.e., rootparentId)
    let rootparentId: number | null = null;
    if (parentNode?.esdFactID !== undefined) {
      rootparentId = parentNode.esdFactID;
      console.log('Root Parent ID:', rootparentId);
    }
    event.rootparentId = rootparentId;

    if (node.parentID !== -1) {
      const element = event.originalEvent.target;
  
      element.addEventListener('dblclick', () => {
        this.editAccount({
          ...event,
          rootparentId: rootparentId
        });
      });
    }
  
    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
    }
  }
  
  
  
  findNodeById(node, id: number): any {
  
      // if (node.esdFactID === id) {
      //   return node;
      // }
      if (node.parent && node.parent !=null) {
        const found = this.findNodeById(node.parent, id);
        if (found) return found;
        else return null;
      }
   else{
    return node;
   }
     
  }
  
  
// onNodeClick(event: any) {
   
//   console.log('Node clicked:', event.node);
//   debugger;
    
//   if(event.node.parentID != -1){
//     const element = event.originalEvent.target; 
//     element.addEventListener('dblclick', () => {
//       this.editAccount(event);
//     });
      
//   }

//   if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
//     console.log('Ctrl or Command + Click');
//     this.addAccount(event);
//   }
  
 
// }
 
  addAccount(obj: any) {
    this.ref = this.dialogService.open(EconomicAndStatisticalDataAccountDetailComponent, {
      header: 'Add ESD Facts',
      data: {
        obj: obj,
        text: "Add ESD Facts",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      if(template != "close")
        this.fetchgbOwnerShipTreeData();
    });

  }

  editAccount(obj: any) {
    debugger
    this.ref = this.dialogService.open(EconomicAndStatisticalDataAccountDetailComponent, {
      header: 'Edit ESD Facts',
      data: {
        obj: obj,
        text: "Edit ESD Facts",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      if(template != "close")
        this.fetchgbOwnerShipTreeData();
    });
    
  }
}
