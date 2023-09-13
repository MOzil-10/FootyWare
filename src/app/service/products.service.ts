import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FootballKit } from '../football-kit';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProduct(): Observable<FootballKit[]> {
    
    return this.http.get<FootballKit[]>('http://localhost:3000/products');
  }


}
