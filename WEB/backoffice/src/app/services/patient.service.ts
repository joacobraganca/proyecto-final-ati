import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('id_token') || '';

  // Obtener todos los pacientes por casa de salud
  getPatientsByHome(healthHome: any): Observable<HttpResponse<Paciente[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Paciente[]>(
      `https://healthhomeapi.herokuapp.com/api/patient/homeId?_id=${healthHome}`,
      { headers, observe: 'response' }
    );
  }

  deletePatientById(id: string): any {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.delete<any>(
      `https://healthhomeapi.herokuapp.com/api/patient?document=${id}`,
      { headers, responseType: 'text' as 'json', observe: 'response' }
    );
  }

  createPatient(patient: any) {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    const body = JSON.stringify(patient);
    return this.http.post('http://localhost:3000/api/patient', body, {
      headers,
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }
}
