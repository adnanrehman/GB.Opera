import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfDayComponent } from './end-of-day.component';

describe('EndOfDayComponent', () => {
  let component: EndOfDayComponent;
  let fixture: ComponentFixture<EndOfDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndOfDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
