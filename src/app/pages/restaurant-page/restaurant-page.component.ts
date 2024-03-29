import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Restaurant } from '../../models/Restaurant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-page',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss'
})


export class RestaurantPageComponent {
  id: string = "";
  restaurant?: Restaurant;
  constructor(private db: DbService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })

    this.db.GetRestaurantById(this.id).subscribe(response => {
      this.restaurant = response
    })
  }
}
