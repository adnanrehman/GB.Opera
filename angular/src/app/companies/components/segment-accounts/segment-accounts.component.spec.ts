import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentAccountsComponent } from './segment-accounts.component';

describe('SegmentAccountsComponent', () => {
  let component: SegmentAccountsComponent;
  let fixture: ComponentFixture<SegmentAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegmentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
