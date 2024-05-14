import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  isAuthenticated!: boolean;
  
  ngOnInit() {
    this.auth.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  
    getRoute() {
      return this.router.url;
    }

    logout() {
      this.router.navigate(['']);
      this.auth.setAuthenticated(false);
      this.auth.logout();
    }
}
