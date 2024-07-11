import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAutocompleteComponent } from './company-autocomplete.component';

describe('CompanyAutocompleteComponent', () => {
  let component: CompanyAutocompleteComponent;
  let fixture: ComponentFixture<CompanyAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
