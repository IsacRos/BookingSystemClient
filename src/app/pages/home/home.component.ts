import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getRandomImage } from '../../utils/helper-functions';


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
  isAuthenticated!: boolean;
  getRandomImage = () => getRandomImage()

  constructor(private db: DbService, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.db.GetAllRestaurants().subscribe(response => {
      this.restaurants = response;
    });
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }


}
