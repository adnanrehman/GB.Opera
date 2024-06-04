import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhscUploadComponent } from './lhsc-upload.component';

describe('LhscUploadComponent', () => {
  let component: LhscUploadComponent;
  let fixture: ComponentFixture<LhscUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LhscUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LhscUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
