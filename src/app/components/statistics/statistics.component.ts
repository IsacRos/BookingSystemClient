import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Booking } from '../../models/Booking';
import { BookingStatus } from '../../models/BookingStatus';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
	bookings: Booking[] = [];
	lastMonth: Date = new Date;

	constructor(private db: DbService) {}

	ngOnInit(): void {
		this.db.GetUserBookings().subscribe({
			next: (res) => this.bookings = res,
			error: (err) => console.log(err)
		});

		this.lastMonth.setMonth(this.lastMonth.getMonth() - 1)
	}

	getLastMonthGuests = (status: BookingStatus) => {
		let guests = 0;
		this.bookings.map(b => {
			if (
				b.bookingDate > this.lastMonth &&
				b.bookingDate < new Date &&
				b.status === status
			) guests += +b.amountOfPeople
		})
		return guests;
	}

	

}
