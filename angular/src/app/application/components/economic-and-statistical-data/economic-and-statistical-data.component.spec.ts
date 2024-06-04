import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicAndStatisticalDataComponent } from './economic-and-statistical-data.component';

describe('EconomicAndStatisticalDataComponent', () => {
  let component: EconomicAndStatisticalDataComponent;
  let fixture: ComponentFixture<EconomicAndStatisticalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicAndStatisticalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EconomicAndStatisticalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
