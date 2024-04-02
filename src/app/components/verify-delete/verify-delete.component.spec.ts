import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeleteComponent } from './verify-delete.component';

describe('VerifyDeleteComponent', () => {
  let component: VerifyDeleteComponent;
  let fixture: ComponentFixture<VerifyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
