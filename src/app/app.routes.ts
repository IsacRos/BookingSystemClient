import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { HomeComponent } from './pages/home/home.component';
import { BookRestaurantPageComponent } from './pages/book-restaurant-page/book-restaurant-page.component';
import { CancelBookingComponent } from './pages/cancel-booking/cancel-booking.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { ActiveBookingPageComponent } from './pages/active-booking-page/active-booking-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'cancel/:id',
        component: CancelBookingComponent
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
            },
            {
                path: 'bookings',
                component: BookingPageComponent,
                canActivate: [authGuard]
            },
            {
                path: 'activeBookings',
                component: ActiveBookingPageComponent,
                canActivate: [authGuard]
            },
            {
                path:'',
                component: HomeComponent,
            },
            {
                path:'restaurant/:id',
                component: BookRestaurantPageComponent,
            },
        ]
    },
    {
        path: '**',
        redirectTo:'' 
    }
];
