import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { BookingStatus } from '../../models/BookingStatus';

@Component({
  selector: 'app-cancel-booking',
  standalone: true,
  imports: [],
  templateUrl: './cancel-booking.component.html',
  styleUrl: './cancel-booking.component.scss'
})
export class CancelBookingComponent implements OnInit {
  id: string = "";

  constructor(private activadedRoute: ActivatedRoute, private db: DbService, private router: Router){}

  ngOnInit(): void {
    this.activadedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  cancelBooking() {
    this.db.CancelBooking(this.id).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => console.log(err)
    })
  }
}
