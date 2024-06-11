import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerNewComponent } from './reviewer-new.component';

describe('ReviewerNewComponent', () => {
  let component: ReviewerNewComponent;
  let fixture: ComponentFixture<ReviewerNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
