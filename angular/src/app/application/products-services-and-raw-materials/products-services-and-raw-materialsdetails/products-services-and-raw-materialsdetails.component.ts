import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsRaw } from '@proxy/product-service-raw/models';
import * as Models from '@proxy/product-service-raw/models';
import { ProductServiceService } from '@proxy/product-service-raw/product-service.service';
 
 
 
 
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-services-and-raw-materialsdetails',
  standalone: true,
  imports: [FormsModule,CommonModule, NgIf],
  templateUrl: './products-services-and-raw-materialsdetails.component.html',
  styleUrl: './products-services-and-raw-materialsdetails.component.scss'
})
export class ProductsServicesAndRawMaterialsdetailsComponent {
  account: ProductsRaw = {
    productServiceRawID: 0,
    name: '',
    parentID: 0,
    aName: '',
    description: '',
    aDescription: '',
    isTitle: false,
  };
  constructor(
    private modalref: DynamicDialogRef,
    public config: DynamicDialogConfig,private productservic : ProductServiceService


  ) {

  }
  Cancel() {
    this.modalref.close(false);
  }
  ngOnInit() {
    debugger;

    if ((this.config.data.obj, this.config.data.text)) {
      var data = this.config.data.obj;

      if (this.config.data.text == 'Edit Account') {
         this.account.productServiceRawID = data.node.productServiceRawID;

        this.getproductServiceRawID(data.node.productServiceRawID);
      } else {
        
          this.account.parentID = data.node.productServiceRawID;
      }
    }
  }

   addProduct() {
      this.productservic.saveUpdateByGbFact(this.account).subscribe({
        next: res => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Success!',
            text: 'Save successfully',
            icon: 'success',
          });
          console.log('Save response:', res);
          this.modalref.close(true);
        },
        error: err => {
          console.error('Error While Saveing', err);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            title: 'Error!',
            text: 'Error While Saveing',
            icon: 'error',
          });
          // alert("Save error: " + err.message); // Display error message to user
        },
      });
    }
    getproductServiceRawID(productServiceRawID: number) {
      this.productservic.getProductServiceRawByIDByProductServiceRawID(productServiceRawID).subscribe({
        next: response => {
          this.account = response.find(item => item.productServiceRawID === productServiceRawID);
        },
        error: err => {
          console.error('Error fetching GbFactsAccount:', err);
        },
      });
    }
}
