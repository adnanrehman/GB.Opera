import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbUniversalFactsComponent } from './gb-universal-facts.component';

describe('GbUniversalFactsComponent', () => {
  let component: GbUniversalFactsComponent;
  let fixture: ComponentFixture<GbUniversalFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbUniversalFactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GbUniversalFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
