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
    return this.http.get<Restaurant[]>('https://localhost:7208/api/Restaurant')
  }

  GetRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`https://localhost:7208/api/Restaurant/${id}`)
  }
}
