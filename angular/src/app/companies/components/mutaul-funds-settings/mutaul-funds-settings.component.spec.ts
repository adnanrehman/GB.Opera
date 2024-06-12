import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutaulFundsSettingsComponent } from './mutaul-funds-settings.component';

describe('MutaulFundsSettingsComponent', () => {
  let component: MutaulFundsSettingsComponent;
  let fixture: ComponentFixture<MutaulFundsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutaulFundsSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MutaulFundsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
