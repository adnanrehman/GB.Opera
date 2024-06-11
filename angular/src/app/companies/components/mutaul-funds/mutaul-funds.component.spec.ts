import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutaulFundsComponent } from './mutaul-funds.component';

describe('MutaulFundsComponent', () => {
  let component: MutaulFundsComponent;
  let fixture: ComponentFixture<MutaulFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutaulFundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MutaulFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
