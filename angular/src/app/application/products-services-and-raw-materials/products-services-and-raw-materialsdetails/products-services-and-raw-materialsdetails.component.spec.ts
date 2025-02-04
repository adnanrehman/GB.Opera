import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsServicesAndRawMaterialsdetailsComponent } from './products-services-and-raw-materialsdetails.component';

describe('ProductsServicesAndRawMaterialsdetailsComponent', () => {
  let component: ProductsServicesAndRawMaterialsdetailsComponent;
  let fixture: ComponentFixture<ProductsServicesAndRawMaterialsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsServicesAndRawMaterialsdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsServicesAndRawMaterialsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
