import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthHomeResponse } from '../interfaces/response/healthHomeResponse';

@Injectable({
  providedIn: 'root',
})
export class HealthHomeService {
  constructor(private http: HttpClient) {}

  getHealthHomes(): Observable<HealthHomeResponse> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: localStorage.getItem('id_token') + '',
    };
    return this.http.get<HealthHomeResponse>(
      'https://healthhomeapi.herokuapp.com/api/healthHome/all',
      {
        headers,
      }
    );
  }
}
