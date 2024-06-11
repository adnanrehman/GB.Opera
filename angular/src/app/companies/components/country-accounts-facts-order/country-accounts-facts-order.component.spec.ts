import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAccountsFactsOrderComponent } from './country-accounts-facts-order.component';

describe('CountryAccountsFactsOrderComponent', () => {
  let component: CountryAccountsFactsOrderComponent;
  let fixture: ComponentFixture<CountryAccountsFactsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryAccountsFactsOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryAccountsFactsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
