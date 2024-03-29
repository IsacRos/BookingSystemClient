import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../models/Restaurant';
import { RouterLink } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  restaurantsUrl = "https://localhost:7208/api/Restaurant";
  restaurants: Restaurant[] = [];
  display = false;

  constructor(private db: DbService) {}

  ngOnInit(): void {
    this.db.GetRestaurant().subscribe(response => {
      this.restaurants = response;
    })
  }

  DisplayAddRestaurant() {
    this.display = !this.display;
  }
}
