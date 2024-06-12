import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundPricesComponent } from './fund-prices.component';

describe('FundPricesComponent', () => {
  let component: FundPricesComponent;
  let fixture: ComponentFixture<FundPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundPricesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
