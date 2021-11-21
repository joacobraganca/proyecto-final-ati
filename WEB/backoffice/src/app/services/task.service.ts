import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('access_token') || '';

  // Obtener todos los pacientes por casa de salud
  getTaskByHome(healthHome: string): Observable<HttpResponse<Task[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Task[]>(
      `https://healthhomeapi.herokuapp.com/api/task/homeId?_id=${healthHome}`,
      { headers, observe: 'response' }
    );
  }

  deleteTaskById(id: string): any {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.delete<any>(
      `https://healthhomeapi.herokuapp.com/api/task?_id=${id}`,
      { headers, responseType: 'text' as 'json', observe: 'response' }
    );
  }

  createTask(task: any) {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    const body = JSON.stringify(task);
    return this.http.post(
      'https://healthhomeapi.herokuapp.com/api/task',
      body,
      {
        headers,
        observe: 'response',
        responseType: 'text' as 'json',
      }
    );
  }
}
