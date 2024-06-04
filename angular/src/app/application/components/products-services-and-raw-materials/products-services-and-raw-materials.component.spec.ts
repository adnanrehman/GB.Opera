import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsServicesAndRawMaterialsComponent } from './products-services-and-raw-materials.component';

describe('ProductsServicesAndRawMaterialsComponent', () => {
  let component: ProductsServicesAndRawMaterialsComponent;
  let fixture: ComponentFixture<ProductsServicesAndRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsServicesAndRawMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsServicesAndRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
