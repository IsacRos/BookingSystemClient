import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBookingPageComponent } from './active-booking-page.component';

describe('ActiveBookingPageComponent', () => {
  let component: ActiveBookingPageComponent;
  let fixture: ComponentFixture<ActiveBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveBookingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
