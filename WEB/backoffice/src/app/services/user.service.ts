import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthHomeResponse } from '../interfaces/response/healthHomeResponse';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;

  constructor(private http: HttpClient) {}

  setUser(user: any) {
    this.user = user;
  }

  getUserId() {
    return this.user._id;
  }

  getApiKey() {
    return localStorage.getItem('id_token');
  }

  getHealthHome() {
    return this.user.assignedHealthHome;
  }

  getRole() {
    return this.user.roleAdmin;
  }

  logOut() {
    this.user = null;
  }

  login(document: string, password: string) {
    const headers = {
      'Content-type': 'application/json',
    };
    const body = JSON.stringify({ document, password });
    return this.http.post('http://localhost:3000/api/user/login', body, {
      headers,
      observe: 'response',
    });
  }

  signup(
    name: string,
    password: string,
    repeatPassword: string,
    document: string,
    assignedHomeHealth: string,
    roleAdmin: string
  ) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({
      name,
      password,
      repeatPassword,
      document,
      assignedHomeHealth,
      roleAdmin,
    });
    return this.http.post(
      'https://healthhomeapi.herokuapp.com/api/user/register',
      body,
      {
        headers,
        observe: 'response',
      }
    );
  }
}
