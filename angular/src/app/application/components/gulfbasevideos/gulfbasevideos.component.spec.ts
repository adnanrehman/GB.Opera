import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GulfbasevideosComponent } from './gulfbasevideos.component';

describe('GulfbasevideosComponent', () => {
  let component: GulfbasevideosComponent;
  let fixture: ComponentFixture<GulfbasevideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GulfbasevideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GulfbasevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
