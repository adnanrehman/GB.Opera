import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbUniversalFactsViewComponent } from './gb-universal-facts-view.component';

describe('GbUniversalFactsViewComponent', () => {
  let component: GbUniversalFactsViewComponent;
  let fixture: ComponentFixture<GbUniversalFactsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbUniversalFactsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GbUniversalFactsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
