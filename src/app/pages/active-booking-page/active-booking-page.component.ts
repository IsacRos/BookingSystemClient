import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/Booking';
import { DbService } from '../../services/db.service';
import { BookingStatus } from '../../models/BookingStatus';
import { StatusGetter } from '../../utils/enumMapper';

@Component({
  selector: 'app-active-booking-page',
  standalone: true,
  imports: [],
  templateUrl: './active-booking-page.component.html',
  styleUrl: './active-booking-page.component.scss'
})
export class ActiveBookingPageComponent implements OnInit {
  bookings: Booking[] = [];
  statusGetter = (status: BookingStatus) => StatusGetter(status);

  constructor (private db: DbService) {}

  ngOnInit(): void {
    this.db.GetUserActiveBookings().subscribe({
      next: (res) => this.bookings = res,
      error: (err) => console.log(err)
    })
  }

}
