import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnetProfitReportComponent } from './qnet-profit-report.component';

describe('QnetProfitReportComponent', () => {
  let component: QnetProfitReportComponent;
  let fixture: ComponentFixture<QnetProfitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QnetProfitReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QnetProfitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
