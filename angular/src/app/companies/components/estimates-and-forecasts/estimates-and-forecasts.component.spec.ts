import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesAndForecastsComponent } from './estimates-and-forecasts.component';

describe('EstimatesAndForecastsComponent', () => {
  let component: EstimatesAndForecastsComponent;
  let fixture: ComponentFixture<EstimatesAndForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimatesAndForecastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimatesAndForecastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
