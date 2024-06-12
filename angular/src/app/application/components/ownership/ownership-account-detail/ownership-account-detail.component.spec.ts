import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipAccountDetailComponent } from './ownership-account-detail.component';

describe('OwnershipAccountDetailComponent', () => {
  let component: OwnershipAccountDetailComponent;
  let fixture: ComponentFixture<OwnershipAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnershipAccountDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnershipAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
