import { CONSTANTS } from './app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ItemService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    console.log(CONSTANTS.LOGIN)
    const id = 1;
    encodeURIComponent(id)
  }

  getAll(): Observable<any> {
    // return this.http.get(this.baseUrl);
    return this.http.get(this.baseUrl + CONSTANTS.ITEMS);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
