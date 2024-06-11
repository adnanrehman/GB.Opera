import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GulfbaseComponent } from './gulfbase.component';

describe('GulfbaseComponent', () => {
  let component: GulfbaseComponent;
  let fixture: ComponentFixture<GulfbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GulfbaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GulfbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
