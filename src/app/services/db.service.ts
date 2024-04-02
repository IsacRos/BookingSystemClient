import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

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
}
