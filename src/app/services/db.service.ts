import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/Restaurant';
import { Table } from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  GetAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('https://localhost:7208/api/Restaurant')
  }

  GetRestaurant(): Observable<Restaurant[]> {
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

  GetTables(id: string): Observable<Table[]> {
    return this.http.get<Table[]>(`https://localhost:7208/api/Table?restaurantId=${id}`)
  }

  AddTable(body: any): Observable<any> {
    return this.http.post(`https://localhost:7208/api/Table`, body)
  }

  DeleteTable(restaurantId: string, tableId: string): Observable<any> {
    return this.http.delete(`https://localhost:7208/api/Table?restaurantId=${restaurantId}&tableId=${tableId}`)
  }
}
