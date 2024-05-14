import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";



@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [DashboardComponent, RouterOutlet, NavBarComponent]
})

 
export class LayoutComponent {
 
}
