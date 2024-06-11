import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDividendsComponent } from './current-dividends.component';

describe('CurrentDividendsComponent', () => {
  let component: CurrentDividendsComponent;
  let fixture: ComponentFixture<CurrentDividendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentDividendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
