import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesProductsServicesRawMaterialsUpdatesComponent } from './companies-products-services-raw-materials-updates.component';

describe('CompaniesProductsServicesRawMaterialsUpdatesComponent', () => {
  let component: CompaniesProductsServicesRawMaterialsUpdatesComponent;
  let fixture: ComponentFixture<CompaniesProductsServicesRawMaterialsUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesProductsServicesRawMaterialsUpdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesProductsServicesRawMaterialsUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
