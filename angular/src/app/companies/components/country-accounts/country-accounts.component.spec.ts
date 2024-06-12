import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAccountsComponent } from './country-accounts.component';

describe('CountryAccountsComponent', () => {
  let component: CountryAccountsComponent;
  let fixture: ComponentFixture<CountryAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
