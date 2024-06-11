import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraDayComponent } from './intra-day.component';

describe('IntraDayComponent', () => {
  let component: IntraDayComponent;
  let fixture: ComponentFixture<IntraDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntraDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntraDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
