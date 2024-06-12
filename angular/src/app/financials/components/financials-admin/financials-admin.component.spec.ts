import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsAdminComponent } from './financials-admin.component';

describe('FinancialsAdminComponent', () => {
  let component: FinancialsAdminComponent;
  let fixture: ComponentFixture<FinancialsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
