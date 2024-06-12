import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicAndBusinessComponent } from './economic-and-business.component';

describe('EconomicAndBusinessComponent', () => {
  let component: EconomicAndBusinessComponent;
  let fixture: ComponentFixture<EconomicAndBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomicAndBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EconomicAndBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
