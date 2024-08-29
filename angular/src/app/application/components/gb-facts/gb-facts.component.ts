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
 

@Component({
  selector: 'app-gb-facts',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './gb-facts.component.html',
  styleUrl: './gb-facts.component.scss'
})
export class GbFactsComponent {

  data: TreeNode[]; 
  cols: any[];
  ref!: DynamicDialogRef;
  treeData = [];
  createPermission: boolean = false;
 
  myinterface: Myinterface[];
  gbFactListDto: GbFactListDto[]
  constructor(private dialogService: DialogService,private gnfactservice: GbFactService,private permissionService: PermissionService) {
    if(this.permissionService.getGrantedPolicy('Application.GBFacts.Create')){
        this.createPermission =true;
    }
  }
 

  
  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.gnfactservice.getAllFactsMappings().subscribe(res => {
      console.log('Tree res:', res);
      
      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.gbFactListDto = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          children: []
        };
        idMap[newItem.gbFactID] = newItem;
        return newItem;
      });
  
      // Build the tree structure
      let treeData = [];
      this.gbFactListDto.forEach(item => {
        if (item.parentId === 0) {
          treeData.push(item);
        } else {
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
    });
  }
  

  ngOnInit() { 
    this.fetchTreeData();
    this.cols = [ 
        { field: 'name', header: 'First Name' }, 
        { field: 'age', header: 'Age' }, 
    ];
 
  }

  addAccount( obj: any) {
    debugger;
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Add Account',
      data: {
        obj: obj,
        text:"Add Account",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
       this.fetchTreeData();
    });

  }

  editHeader(obj: any) {
    debugger;
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
        text:"Edit Account",
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      // this.getAll({});
      //this.fetchTreeData();
    });
  }

  onNodeClick(event: any) {
    // Handle single click logic here
    console.log('Node clicked:', event.node);
    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
     
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
    } else {
      
     
      this.editHeader(event);
    }
  }

 


}
