import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthHomeResponse } from '../interfaces/response/healthHomeResponse';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  nurses: User[] = [];

  constructor(private http: HttpClient) {}

  setNurses(nurses: User[]) {
    this.nurses = nurses;
  }
  getNursesLocal() {
    return this.nurses;
  }

  setUser(user: any) {
    this.user = user;
  }

  getUserName() {
    return this.user.name;
  }
  getUserId() {
    return this.user._id;
  }

  getApiKey() {
    return localStorage.getItem('access_token') || '';
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
    return this.http.post(
      'https://healthhomeapi.herokuapp.com/api/user/login',
      body,
      {
        headers,
        observe: 'response',
      }
    );
  }

  signup(
    name: string,
    password: string,
    document: string,
    assignedHealthHome: string,
    roleAdmin: string
  ) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({
      name,
      password,
      document,
      assignedHealthHome,
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

  getNursesByHome(healthHome: string): Observable<HttpResponse<User[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.getApiKey(),
    };
    return this.http.get<User[]>(
      `https://healthhomeapi.herokuapp.com/api/user/homeId?_id=${healthHome}`,
      { headers, observe: 'response' }
    );
  }
}
