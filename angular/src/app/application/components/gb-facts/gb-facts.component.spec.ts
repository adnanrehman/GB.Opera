import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbFactsComponent } from './gb-facts.component';

describe('GbFactsComponent', () => {
  let component: GbFactsComponent;
  let fixture: ComponentFixture<GbFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbFactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GbFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
