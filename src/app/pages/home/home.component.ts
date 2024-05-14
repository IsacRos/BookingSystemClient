import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  id: string = '';

  constructor(private db: DbService) {}
  
  ngOnInit(): void {
    this.db.GetAllRestaurants().subscribe(response => {
      this.restaurants = response;
    })
  }
}
