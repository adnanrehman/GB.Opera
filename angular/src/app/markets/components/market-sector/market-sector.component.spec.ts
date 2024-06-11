import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSectorComponent } from './market-sector.component';

describe('MarketSectorComponent', () => {
  let component: MarketSectorComponent;
  let fixture: ComponentFixture<MarketSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketSectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
