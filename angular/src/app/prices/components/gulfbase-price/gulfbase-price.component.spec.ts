import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GulfbasePriceComponent } from './gulfbase-price.component';

describe('GulfbasePriceComponent', () => {
  let component: GulfbasePriceComponent;
  let fixture: ComponentFixture<GulfbasePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GulfbasePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GulfbasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
