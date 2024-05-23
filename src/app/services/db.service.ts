import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Restaurant } from '../models/Restaurant';
import { Table } from '../models/Table';
import { BookingStatus } from '../models/BookingStatus';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  GetAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('https://localhost:7208/api/Restaurant')
  }

  GetUserRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('https://localhost:7208/api/Restaurant/UserRestaurants')
  }

  GetRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`https://localhost:7208/api/Restaurant/${id}`)
  }

  AddRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post('https://localhost:7208/api/Restaurant', restaurant)
  }

  DeleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`https://localhost:7208/api/Restaurant?id=${id}`)
  }

  UpdateRestaurant(body: any): Observable<any> {
    return this.http.put('https://localhost:7208/api/Restaurant', body)
  }

  /* GetTables(id: string): Observable<Table[]> {
    return this.http.get<Table[]>(`https://localhost:7208/api/Table?restaurantId=${id}`)
  } */
  GetTables(id: string): Observable<Table[]> {
    return this.http.get<Table[]>(`https://localhost:7208/api/Table?restaurantId=${id}`).pipe(
      map((tables: Table[]) => {
        // Parse string dates to Date objects for each table's bookings
        return tables.map(table => ({
          ...table,
          bookings: table.bookings.map(booking => ({
            startTime: new Date(booking.startTime),
            endTime: new Date(booking.endTime)
          }))
        }));
      })
    );
  }

  AddTable(body: any): Observable<any> {
    return this.http.post(`https://localhost:7208/api/Table`, body)
  }

  DeleteTable(restaurantId: string, tableId: string): Observable<any> {
    return this.http.delete(`https://localhost:7208/api/Table?restaurantId=${restaurantId}&tableId=${tableId}`)
  }

  GetBookings(restaurantId: string, status?: BookingStatus) {
    const query = status ? `&status=${status}` : ''
    console.log(status);
    return this.http.get(`https://localhost:7208/api/Booking=restaurantId=${restaurantId + query}`)
  }

  GetUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('https://localhost:7208/api/Booking/UserBookings').pipe(
      map((bookings: Booking[]) => {
        return bookings.map(booking => ({
          ...booking,
          bookingDate: new Date(booking.bookingDate)
        }))
      })
    );
  }
  GetUserActiveBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('https://localhost:7208/api/Booking/UserActiveBookings').pipe(
      map((bookings: Booking[]) => {
        return bookings.map(booking => ({
          ...booking,
          bookingDate: new Date(booking.bookingDate)
        }))
      })
    );
  }
  
  BookTable(booking: any): Observable<any> {
    return this.http.post('https://localhost:7208/api/Booking', booking)
  }

  ChangeStatus(id: string, status: BookingStatus){
    return this.http.get(`https://localhost:7208/api/Booking/StatusChange?bookingId=${id}&status=${status}`)
  }

  CancelBooking(bookingId: string) {
    return this.http.get(`https://localhost:7208/api/Booking/CancelBooking?bookingId=${bookingId}`)
  }

  RespondToBookingRequest(id: string, response: boolean) {
    return this.http.get(`https://localhost:7208/api/Booking/RespondToBookingRequest?bookingId=${id}&response=${response}`)
  }
}

