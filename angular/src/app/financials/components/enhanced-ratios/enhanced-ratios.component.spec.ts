import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedRatiosComponent } from './enhanced-ratios.component';

describe('EnhancedRatiosComponent', () => {
  let component: EnhancedRatiosComponent;
  let fixture: ComponentFixture<EnhancedRatiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnhancedRatiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnhancedRatiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
