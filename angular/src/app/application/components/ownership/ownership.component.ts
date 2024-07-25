
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { GbFactsAccountDetailComponent } from '../gb-facts/gb-facts-account-detail/gb-facts-account-detail.component';
import { OwnershipAccountDetailComponent } from './ownership-account-detail/ownership-account-detail.component';
import { GbOwnerShip, GbOwnerShipService } from '@proxy/gb-owner-ships';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-ownership',
  standalone: true,
  imports: [TreeModule,TooltipModule],
  templateUrl: './ownership.component.html',
  styleUrl: './ownership.component.scss'
})
export class OwnershipComponent {
  data: TreeNode[]; 
  ref!: DynamicDialogRef;
  gbOwnerShip: GbOwnerShip[];
  constructor(private dialogService: DialogService,private gbOwnerShipService : GbOwnerShipService) {}

  ngOnInit() { 
    this.fetchgbOwnerShipTreeData();
  }

  fetchgbOwnerShipTreeData(): void {
    
    this.gbOwnerShipService.getAllFactsOwnershipMappings().subscribe(res => {
      console.log('Tree res:', res);
      
      
      let idMap = {};
      this.gbOwnerShip = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbOwnership || '',  
          parent: null,
          Tooltip:item.agbOwnership,
          children: []
        };
        idMap[newItem.gbOwnershipID] = newItem;
        return newItem;
      });
  
     
      let treeData = [];
      this.gbOwnerShip.forEach(item => {
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
      this.gbOwnerShip = treeData;
      console.log('Tree Data:', this.gbOwnerShip);
    });
  }
  onNodeClick(event: any) {
    // Handle single click logic here
    console.log('Node clicked:', event.node);
    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
     
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
       
    } else {
      
     
      this.editAccount(event);
       
    }
  }
  addAccount(obj: any) {
    this.ref = this.dialogService.open(OwnershipAccountDetailComponent, {
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
;
    });

  }

  editAccount(obj: any) {
    debugger
    this.ref = this.dialogService.open(OwnershipAccountDetailComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
        text:"Edit Account"
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
    });
  }

}
