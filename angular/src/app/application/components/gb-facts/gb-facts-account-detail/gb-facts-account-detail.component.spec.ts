import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbFactsAccountDetailComponent } from './gb-facts-account-detail.component';

describe('GbFactsAccountDetailComponent', () => {
  let component: GbFactsAccountDetailComponent;
  let fixture: ComponentFixture<GbFactsAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GbFactsAccountDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GbFactsAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
