import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [DashboardComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

 
export class LayoutComponent {
  isLoggedIn = this.auth;
  
  constructor(private router: Router, private auth: AuthService) { }

  getRoute() {
    return this.router.url;
  }

  logout() {
    this.router.navigate(['']);
    this.auth.logout() ;
  }
  
}
