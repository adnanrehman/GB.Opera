import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesAdminComponent } from './batches-admin.component';

describe('BatchesAdminComponent', () => {
  let component: BatchesAdminComponent;
  let fixture: ComponentFixture<BatchesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
