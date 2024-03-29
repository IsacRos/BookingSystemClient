import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'dashboard/:id', 
                component: RestaurantPageComponent,
                canActivate: [authGuard]
            }
        ]
    }
];
