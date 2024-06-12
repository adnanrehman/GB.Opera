import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicAndStatisticalDataAccountDetailComponent } from './economic-and-statistical-data-account-detail.component';

describe('EconomicAndStatisticalDataAccountDetailComponent', () => {
  let component: EconomicAndStatisticalDataAccountDetailComponent;
  let fixture: ComponentFixture<EconomicAndStatisticalDataAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicAndStatisticalDataAccountDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EconomicAndStatisticalDataAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
