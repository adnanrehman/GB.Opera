import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomOrderComponent } from './accounts-custom-order.component';

describe('AccountsCustomOrderComponent', () => {
  let component: AccountsCustomOrderComponent;
  let fixture: ComponentFixture<AccountsCustomOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsCustomOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsCustomOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
