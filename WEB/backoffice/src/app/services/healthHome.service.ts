import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthHomeResponse } from '../interfaces/response/healthHomeResponse';
import { HealthHome } from '../interfaces/healthHome';

@Injectable({
  providedIn: 'root',
})
export class HealthHomeService {
  constructor(private http: HttpClient) {}

  getHealthHomes(): Observable<HealthHome[]> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: localStorage.getItem('access_token') + '',
    };
    return this.http.get<HealthHome[]>(
      'https://healthhomeapi.herokuapp.com/api/healthHome/all',
      {
        headers,
      }
    );
  }
}
