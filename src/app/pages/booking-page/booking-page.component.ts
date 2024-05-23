import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Booking } from '../../models/Booking';
import { StatusGetter } from '../../utils/enumMapper';
import { BookingStatus } from '../../models/BookingStatus';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss'
})
export class BookingPageComponent implements OnInit {
  bookings: Booking[] = [];
  statusGetter = (status: BookingStatus) => StatusGetter(status);
  
  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.db.GetUserBookings().subscribe({
      next: (res) => this.bookings = res,
      error: (err) => console.log(err)
    })
  }
}
