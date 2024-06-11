import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesReEntryComponent } from './batches-re-entry.component';

describe('BatchesReEntryComponent', () => {
  let component: BatchesReEntryComponent;
  let fixture: ComponentFixture<BatchesReEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchesReEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchesReEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
