import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AddRestaurantComponent } from "../../components/add-restaurant/add-restaurant.component";
import { PopupService } from '../../services/popup.service';
import { VerifyDeleteComponent } from '../../components/verify-delete/verify-delete.component';
import { EditRestaurantComponent } from '../../components/edit-restaurant/edit-restaurant.component';
import { DeleteModel } from '../../models/DeleteModel';
import { Booking } from '../../models/Booking';
import { StatusGetter } from '../../utils/enumMapper';
import { BookingStatus } from '../../models/BookingStatus';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [RouterLink, AddRestaurantComponent]
})

export class DashboardComponent implements OnInit {
  bookings: Booking[] = [];
  pendingBookings: Booking[] = [];
  activeBookings: Booking[] = [];
  restaurants: Restaurant[] = [];
  display = false;
  statusGetter = (status: BookingStatus) => StatusGetter(status);

  constructor(private db: DbService, private popupService: PopupService) {}
  
  ngOnInit(): void {
    var today = new Date();
    this.db.GetUserRestaurants().subscribe(response => {
      this.restaurants = response;
    })

    this.db.GetUserBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        this.pendingBookings = this.bookings.filter(b => b.status === BookingStatus.Pending);
        this.activeBookings = this.bookings.filter(b => b.status === BookingStatus.Approved && b.bookingDate < today);
      },
      error: (err) => {console.log(err)}
    })
    
  }
  
  
  DisplayAddRestaurant() {
    // this.display = !this.display;
    this.popupService.openPopup(AddRestaurantComponent);
  }

  onEdit(id: string) {
    this.popupService.openPopup(EditRestaurantComponent, id);
  }

  onDelete(id: string) {
    let deleteModel: DeleteModel = {
      type: "restaurant",
      value: id
    };
    this.popupService.openPopup(VerifyDeleteComponent, deleteModel);
  }

  acceptBooking(id: string) {
    this.db.RespondToBookingRequest(id, true).subscribe({
      next: () => location.reload(),
      error: (err) => console.log(err)
    });
  }
  
  declineBooking(id: string) {
    this.db.RespondToBookingRequest(id, false).subscribe({
      next: () => location.reload(),
      error: (err) => console.log(err)
    });
  }

  closeAllPending() {
    this.pendingBookings.forEach(b => {
      // console.log(b);
      if(b.bookingDate < new Date()) {
        console.log(b);
        // this.db.ChangeStatus(b.id, BookingStatus.Closed).subscribe()
        
      }
    })
  }

  confirmShowUp(bookingId: string, showUp: boolean) {
    this.db.ChangeStatus(bookingId, showUp ? BookingStatus.Closed : BookingStatus.NoShow).subscribe({
      next: () => location.reload(),
      error: (err) => console.log(err)
    })
  }
}

