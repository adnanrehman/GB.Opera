import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryProfileAdminComponent } from './country-profile-admin.component';

describe('CountryProfileAdminComponent', () => {
  let component: CountryProfileAdminComponent;
  let fixture: ComponentFixture<CountryProfileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryProfileAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
