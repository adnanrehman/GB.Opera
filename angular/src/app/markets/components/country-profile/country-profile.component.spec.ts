import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryProfileComponent } from './country-profile.component';

describe('CountryProfileComponent', () => {
  let component: CountryProfileComponent;
  let fixture: ComponentFixture<CountryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
