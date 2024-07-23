import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsClassificationsDetailComponent } from './accounts-classifications-detail.component';

describe('AccountsClassificationsDetailComponent', () => {
  let component: AccountsClassificationsDetailComponent;
  let fixture: ComponentFixture<AccountsClassificationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsClassificationsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsClassificationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
