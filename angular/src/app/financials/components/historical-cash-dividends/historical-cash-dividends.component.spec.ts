import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalCashDividendsComponent } from './historical-cash-dividends.component';

describe('HistoricalCashDividendsComponent', () => {
  let component: HistoricalCashDividendsComponent;
  let fixture: ComponentFixture<HistoricalCashDividendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalCashDividendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricalCashDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
