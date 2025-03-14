import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
//import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { TabService } from 'src/app/tab/tab.service';
import { AccountsClassificationsDetailComponent } from './accounts-classifications-detail/accounts-classifications-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ACFactsDtos, AccountClassificationService, GbAcFactsAccount } from '@proxy/accounts-classifications';
import { GbFactListDto, GbFactService } from '@proxy/gb-facts';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Application_AccountsClassification } from 'src/app/services/permissions';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
@Component({
  selector: 'app-accounts-classification',
  standalone: true,
  //imports :[TreeSelectModule],
  imports: [TreeModule, TooltipModule, CommonModule, FormsModule,NgIf,ThemeSharedModule],
  templateUrl: './accounts-classification.component.html',
  styleUrl: './accounts-classification.component.scss'
})
export class AccountsClassificationComponent {

  // data:TreeSelectModule[];
  tree: TreeNode[];
  data: TreeNode[];
  ref!: DynamicDialogRef;
  loading = false;
  treeData = [];
  acFactsDtos: ACFactsDtos[];
  gbFactListDto: GbFactListDto[];
  addfacts: GbFactListDto[] = [];
  selectedNode: TreeNode;
  selectedNodes: TreeNode[] = [];
  createPermission: boolean = false;
  permission: {
    create: boolean 
    edit: boolean,
    delete: boolean
  }
  constructor(private tabService: TabService, private router: Router, private dialogService: DialogService
    , private accountClassificationService: AccountClassificationService, private gnfactservice: GbFactService
    , private permissionService: PermissionService) {
      this.permission = {
        create: false,
        edit : false,
        delete  :false
      }
  }

  fetchAccountsTreeData(): void {
    debugger; // For debugging purposes
    this.loading = true;
    this.accountClassificationService.getAllACFactsMappings().subscribe(res => {
      console.log('Tree res:', res);

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.acFactsDtos = res.map(item => {
        let newItem = {
          ...item,
          label: item.acFact || '', // Assign gbFact to label or default to empty string
          parent: null,
          key:item.acFact || '',
          Tooltip: item.aAcFact,
          expanded:item.parentId == -1 ? true : false,
          children: []
        };
        idMap[newItem.acFactId] = newItem;
        return newItem;
      });

      // Build the tree structure
      let treeData = [];
      this.acFactsDtos.forEach(item => {
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
      this.acFactsDtos = treeData;
      console.log('Tree Data:', this.acFactsDtos);
      this.loading = false;
    });
  }

  ngOnInit() {
    debugger;
    if (this.permissionService.getGrantedPolicy(Application_AccountsClassification + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_AccountsClassification + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Application_AccountsClassification + '.delete')) {
      this.permission.delete = true;
    }
    this.fetchAccountsTreeData();
    this.fetchTreeData();
   

  }

  fetchTreeData(): void {
    debugger; // For debugging purposes
    this.loading = true;
    this.gnfactservice.getAllFactsMappings().subscribe(res => {
      console.log('Tree res:', res);

      // Initialize idMap and gbFactListDto
      let idMap = {};
      this.gbFactListDto = res.map(item => {
        let newItem = {
          ...item,
          label: item.gbFact || '', // Assign gbFact to label or default to empty string
          key:item.gbFact || '',
          Tooltip: item.agbFact,
          leaf: item.agbFact,
          expanded:item.parentId == -1 ? true : false,
          parent: null,
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


  editHeader(obj: any) {

    this.ref = this.dialogService.open(AccountsClassificationsDetailComponent, {
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
      if(template)
        this.fetchAccountsTreeData();
    });
  }

  addAccount(obj: any) {

    this.ref = this.dialogService.open(AccountsClassificationsDetailComponent, {
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
        this.fetchAccountsTreeData();
    });

  }

  onNodeClick(event: any) {
    // Handle single click logic here
    console.log('Node clicked:', event.node);
    debugger;
    if(event.node.parentId != -1){
      const element = event.originalEvent.target; 
      element.addEventListener('dblclick', () => {
        this.editHeader(event);
      });
        
    }

    if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      console.log('Ctrl or Command + Click');
      this.addAccount(event);
    }
    
   
  }

  // onNodeClick(event: any) {
  //   // Handle single click logic here
  //   console.log('Node clicked:', event.node);
  //   if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {

  //     console.log('Ctrl or Command + Click');
  //     this.addAccount(event);
  //   } else {


  //     this.editHeader(event);
  //   }
  // }

  

  onNodeSelect(event: { originalEvent: Event, node: TreeNode }): void {

    this.selectedNode = event.node;
    console.log('Selected Node:', this.selectedNode.label);
    //alert(this.selectedNode.leaf);
    var gbFactID = (this.selectedNode as any).agbFact;

    // alert(  this.umar);

  }
  addSelectedNodeToFacts() {
    debugger;

    // Ensure selectedNode is defined and not already in addfacts
    if (this.selectedNode && !this.addfacts.some(fact => fact.gbFactID === (this.selectedNode as any).gbFactID)) {
      const factDto: GbFactListDto = {
        gbFactID: (this.selectedNode as any).gbFactID,
        parentId: 0,
        gbFact: this.selectedNode.label,
        agbFact: (this.selectedNode as any).agbFact
        // Add other properties as needed
      };

      this.addfacts.push(factDto);
      // alert(JSON.stringify(this.addfacts));
    } else {
      // Optionally notify the user or log that the node is already added
      console.log('Node already exists in addfacts.');
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        title: 'Error!',
        text: "Node already exists in addfacts.",
        icon: 'error'
      });
    }
    debugger;
    const gbAcFactsAccounts: GbAcFactsAccount[] = this.mapGbFactListDtoToGbAcFactsAccount(this.addfacts);
    if (gbAcFactsAccounts.length > 0) {


      this.accountClassificationService.saveUpdateAacFactsByGbAcFactsAccounts(gbAcFactsAccounts).subscribe({
        next: (res) => {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Save successfully', icon: 'success', });
          console.log('Save response:', res);
          this.fetchAccountsTreeData();
          this.fetchTreeData();
          this.addfacts = null;



        },
        error: (err) => {

          console.error("Error While Saveing", err);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            title: 'Error!',
            text: "Error While Saveing",
            icon: 'error'
          });

          // alert("Save error: " + err.message); // Display error message to user
        }
      });
    }
    else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        title: 'Error!',
        text: "Select at least one record.",
        icon: 'error'
      });

    }
  }
  mapGbFactListDtoToGbAcFactsAccount(acFactsDtos: GbFactListDto[]): GbAcFactsAccount[] {
    return acFactsDtos.map(dto => ({
      acFactID: 0,
      acFact: dto.gbFact, // Handle nullable properties if necessary
      parentID: dto.parentId,
      aacFact: dto.agbFact, // Handle nullable properties if necessary
      isACAccount: false, // Initialize as needed
      isTitle: false, // Initialize as needed
      gbFactID: dto.gbFactID

    }));
  }


}


