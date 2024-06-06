import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Booking } from '../../models/Booking';
import { StatusGetter } from '../../utils/enumMapper';
import { BookingStatus } from '../../models/BookingStatus';
import { convertTimeString } from '../../utils/helper-functions';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Observable, map } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
	selector: 'app-booking-page',
	standalone: true,
	imports: [MatTableModule, MatSortModule],
	templateUrl: './booking-page.component.html',
	styleUrl: './booking-page.component.scss'
})
export class BookingPageComponent implements OnInit, AfterViewInit {
	dataSource!: MatTableDataSource<Booking>;

	@ViewChild(MatSort) sort!: MatSort;

	ngAfterViewInit(): void {
		if (this.dataSource) this.dataSource.sort = this.sort;
	}

	columnsToDisplay = ['restaurantName', 'amountGuests', 'time', 'date', 'guestName', 'guestEmail', 'guestPhNr', 'status']
	statusGetter = StatusGetter;
	convertTimeString = convertTimeString;

	constructor(private db: DbService, private liveAnnouncer: LiveAnnouncer) { }

	ngOnInit(): void {
		this.db.GetUserBookings().subscribe({
			next: (res) => {
				this.dataSource = new MatTableDataSource<Booking>(res);
			},
			error: (err) => console.log(err)
		})
	}

	SortChange(sort: Sort) {
		if (!sort.active || sort.direction === '') {
			return;
		}

		const directionMultiplier = sort.direction === 'asc' ? 1 : -1;

		this.dataSource.data = this.dataSource.data.sort((a, b) => {
			let comparison = 0;

			switch (sort.active) {
				case 'restaurantName':
				case 'customerLastName':
				case 'customerEmail':
				case 'customerPhone':
					comparison = a[sort.active].localeCompare(b[sort.active]);
					break;
				case 'status':
					comparison = a[sort.active].toString().localeCompare(b[sort.active].toString());
					break;
				case 'bookingDate':
					comparison = new Date(a[sort.active]).getTime() - new Date(b[sort.active]).getTime();
					break;
				case 'bookingTime':
					comparison = new Date(a['bookingDate']).getHours() - new Date(b['bookingDate']).getHours();
					break;
				case 'amountOfPeople':
					comparison = +a[sort.active] - +b[sort.active];
					break;
				default:
					comparison = 0;
			}
			return comparison * directionMultiplier;
		});
	}
}
