import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompQnetPComponent } from './comp-qnet-p.component';

describe('CompQnetPComponent', () => {
  let component: CompQnetPComponent;
  let fixture: ComponentFixture<CompQnetPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompQnetPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompQnetPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
