import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../models/Restaurant';
import { DbService } from '../../services/db.service';
import { Table } from '../../models/Table';
import { TableBooking } from '../../models/TableBooking';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerModule } from 'angular-material-datepicker';

@Component({
  selector: 'app-book-restaurant-page',
  standalone: true,
  imports: [MatNativeDateModule],
  templateUrl: './book-restaurant-page.component.html',
  styleUrl: './book-restaurant-page.component.scss'
})
export class BookRestaurantPageComponent {
  id: string = '';
  restaurant!: Restaurant;
  tables?: Table[];

  

  constructor(private router: ActivatedRoute, private db: DbService) {};
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })

    this.db.GetRestaurantById(this.id).subscribe(response => {
      this.restaurant = response;
    })

    this.db.GetTables(this.id).subscribe(response => {
      this.tables = response;
    })

  }
  
  checkAvailability(booking: TableBooking, date: Date): boolean {
    if (date > booking.startTime && date < booking.endTime) return false;
    return true;
  }

}
