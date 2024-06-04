import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbirComponent } from './gbir.component';

describe('GbirComponent', () => {
  let component: GbirComponent;
  let fixture: ComponentFixture<GbirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GbirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
