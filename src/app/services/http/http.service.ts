import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string;
  
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  resetSeats() {
    return this.http.put(`${this.apiUrl}/seats`, {});
  }


  getSeatsDetails() {
    return this.http.get(`${this.apiUrl}/seats`)
  }

  bookSeats(seatCount: number) {
    return this.http.post(`${this.apiUrl}/seats`, {seatCount: seatCount}, {});
  }
}
