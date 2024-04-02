import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AddRestaurantComponent } from "../../components/add-restaurant/add-restaurant.component";
import { PopupService } from '../../services/popup.service';
import { VerifyDeleteComponent } from '../../components/verify-delete/verify-delete.component';
import { EditRestaurantComponent } from '../../components/edit-restaurant/edit-restaurant.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [RouterLink, AddRestaurantComponent]
})

export class DashboardComponent implements OnInit {
  
  restaurants: Restaurant[] = [];
  display = false;

  constructor(private db: DbService, private popupService: PopupService) {}
  
  ngOnInit(): void {
    this.db.GetRestaurant().subscribe(response => {
      this.restaurants = response;
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
    this.popupService.openPopup(VerifyDeleteComponent, id);
  }
}

