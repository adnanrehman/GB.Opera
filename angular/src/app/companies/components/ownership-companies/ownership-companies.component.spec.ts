import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipCompaniesComponent } from './ownership-companies.component';

describe('OwnershipCompaniesComponent', () => {
  let component: OwnershipCompaniesComponent;
  let fixture: ComponentFixture<OwnershipCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnershipCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
