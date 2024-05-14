import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRestaurantPageComponent } from './book-restaurant-page.component';

describe('BookRestaurantPageComponent', () => {
  let component: BookRestaurantPageComponent;
  let fixture: ComponentFixture<BookRestaurantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRestaurantPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
