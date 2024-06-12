import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesRatingComponent } from './agencies-rating.component';

describe('AgenciesRatingComponent', () => {
  let component: AgenciesRatingComponent;
  let fixture: ComponentFixture<AgenciesRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenciesRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenciesRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
