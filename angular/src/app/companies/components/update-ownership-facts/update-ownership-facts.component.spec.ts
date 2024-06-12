import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOwnershipFactsComponent } from './update-ownership-facts.component';

describe('UpdateOwnershipFactsComponent', () => {
  let component: UpdateOwnershipFactsComponent;
  let fixture: ComponentFixture<UpdateOwnershipFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOwnershipFactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOwnershipFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
