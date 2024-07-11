import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GbFactsAccountDetailComponent } from './gb-facts-account-detail/gb-facts-account-detail.component';
import { TreeModule } from 'primeng/tree';
import { Myinterface } from 'src/app/myinterface';
import { GbFactService } from '@proxy/gb-facts/gb-fact.service';
import { GbFactListDto } from '@proxy/gb-facts/models';
 

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
 
  myinterface: Myinterface[];
  gbFactListDto: GbFactListDto[]
  constructor(private dialogService: DialogService,private gnfactservice: GbFactService) {}
 

  /*fetchTreeData(): void {
    debugger; // For debugging purposes
    this.gnfactservice.getAllFactsMappings().subscribe((res => {
      console.log('Tree res:',  res);
      this.gbFactListDto = res;
      let idMap = {};
      this.gbFactListDto.forEach(item => {
        // Ensure each item has a valid gbFact property
        if (!item.gbFact) {
          item.label = ''; // Provide a default value or handle missing gbFact appropriately
        } else {
          item.label = item.gbFact || ''; // Assign gbFact to label or provide a default value
        item.parent = null; // Assign gbFact to label
        }
      });
      this.gbFactListDto.forEach(item => {
        idMap[item.gbFactID] = { ...item, children: [] };
      });

      let treeData = [];
      this.gbFactListDto.forEach(item => {
        if (item.parentId === 0) {
          treeData.push(idMap[item.gbFactID]); 
        } else {

          if (idMap[item.parentId]) {
            idMap[item.parentId].children.push(idMap[item.gbFactID]);
            idMap[item.gbFactID].parent = idMap[item.label];
          } else {
            console.error(`Parentid ${item.parentId} not found in idMap.`);
          }
        }
      });
 
      //this.gbFactListDto=this.treeData;
      console.log('Tree Data:', this.gbFactListDto);
       
  }));
  //this.treeData = this.gbFactListDto;
  this.gbFactListDto=this.treeData;
  console.log('1Tree Data:', this.data);
        
  }*/
  
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
            // item.parent = parentItem;
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
 /*    let data1 = [
      { GBFactID: 1, Parentid: null, GbFact: 'Animal', label: 'Animal' },
      { GBFactID: 2, Parentid: 1, GbFact: 'Mammal', label: 'Mammal' },
      { GBFactID: 3, Parentid: 1, GbFact: 'Bird', label: 'Bird' },
      { GBFactID: 4, Parentid: 2, GbFact: 'Cat', label: 'Cat' },
      { GBFactID: 5, Parentid: 2, GbFact: 'Dog', label: 'Dog' },
      { GBFactID: 6, Parentid: 3, GbFact: 'Eagle', label: 'Eagle' },
      { GBFactID: 7, Parentid: 3, GbFact: 'Parrot', label: 'Parrot' },
      { GBFactID: 8, Parentid: 4, GbFact: 'Persian Cat', label: 'Persian Cat' },
      { GBFactID: 9, Parentid: 4, GbFact: 'Siamese Cat', label: 'Siamese Cat' },

      { GBFactID: 10, Parentid: null, GbFact: 'Animal 2', label: 'Animal 2' },
      { GBFactID: 11, Parentid: 10, GbFact: 'Mammal', label: 'Mammal' },
      { GBFactID: 12, Parentid: 10, GbFact: 'Bird', label: 'Bird' },
      { GBFactID: 13, Parentid: 11, GbFact: 'Cat', label: 'Cat' },
      { GBFactID: 14, Parentid: 11, GbFact: 'Dog', label: 'Dog' },
      { GBFactID: 15, Parentid: 12, GbFact: 'Eagle', label: 'Eagle' },
      { GBFactID: 16, Parentid: 12, GbFact: 'Parrot', label: 'Parrot' },
      { GBFactID: 17, Parentid: 13, GbFact: 'Persian Cat', label: 'Persian Cat' },
      { GBFactID: 18, Parentid: 13, GbFact: 'Siamese Cat', label: 'Siamese Cat' },
    ]; 
 
    let idMap = {};
data1.forEach(item => {
  idMap[item.GBFactID] = { ...item, children: [] };
});
debugger;
// Step 2: Build treeData based on Parentid relationships
let treeData = [];
data1.forEach(item => {
  if (item.Parentid === null) {
    treeData.push(idMap[item.GBFactID]); // Add root nodes directly to treeData
  } else {
    if (idMap[item.Parentid]) {
      idMap[item.Parentid].children.push(idMap[item.GBFactID]); // Add child nodes to parent's children array
    } else {
      console.error(`Parentid ${item.Parentid} not found in idMap.`);
    }
  }
});

console.log('idMap:', idMap); // Check idMap in console
console.log('treeData:', treeData);
this.myinterface=treeData;

    // Now you have treeData ready to be used in your component
*/

  }

  addAccount() {
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Add Account',
      data: {
        obj: null
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      // this.getAll({});
    });

  }

  editHeader(obj: any) {
    debugger
    this.ref = this.dialogService.open(GbFactsAccountDetailComponent, {
      header: 'Edit Account',
      data: {
        obj: obj,
      },
      width: '40%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      // this.getAll({});
    });
  }

 


}
