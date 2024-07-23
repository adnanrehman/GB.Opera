import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySectorComponent } from './company-sector.component';

describe('CompanySectorComponent', () => {
  let component: CompanySectorComponent;
  let fixture: ComponentFixture<CompanySectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
