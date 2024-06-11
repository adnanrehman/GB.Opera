import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesEntryComponent } from './batches-entry.component';

describe('BatchesEntryComponent', () => {
  let component: BatchesEntryComponent;
  let fixture: ComponentFixture<BatchesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchesEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
