import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesAgenciesAndRatingsComponent } from './companies-agencies-and-ratings.component';

describe('CompaniesAgenciesAndRatingsComponent', () => {
  let component: CompaniesAgenciesAndRatingsComponent;
  let fixture: ComponentFixture<CompaniesAgenciesAndRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesAgenciesAndRatingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesAgenciesAndRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
