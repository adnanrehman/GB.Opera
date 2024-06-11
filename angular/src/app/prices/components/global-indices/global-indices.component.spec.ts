import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalIndicesComponent } from './global-indices.component';

describe('GlobalIndicesComponent', () => {
  let component: GlobalIndicesComponent;
  let fixture: ComponentFixture<GlobalIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalIndicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
