import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIndicatorsBatchComponent } from './upload-indicators-batch.component';

describe('UploadIndicatorsBatchComponent', () => {
  let component: UploadIndicatorsBatchComponent;
  let fixture: ComponentFixture<UploadIndicatorsBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadIndicatorsBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadIndicatorsBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
