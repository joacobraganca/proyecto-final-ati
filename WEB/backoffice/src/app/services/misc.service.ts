import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';
import { Misc } from '../interfaces/misc';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  hospitals: Misc[] = [];
  pathologies: Misc[] = [];
  partnerServices: Misc[] = [];
  emertencyServices: Misc[] = [];

  setHospitals(hospitals: Misc[]) {
    this.hospitals = hospitals;
  }
  setPathologies(pathologies: Misc[]) {
    this.pathologies = pathologies;
  }
  setPartnerServices(partnerServices: Misc[]) {
    this.partnerServices = partnerServices;
  }
  setEmertencyServices(emertencyServices: Misc[]) {
    this.emertencyServices = emertencyServices;
  }

  getHospitalsLocal() {
    return this.hospitals;
  }
  getPathologiesLocal() {
    return this.pathologies;
  }
  getPartnerServicesLocal() {
    return this.partnerServices;
  }
  getEmertencyServicesLocal() {
    return this.emertencyServices;
  }

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('access_token') || '';

  getHospital(): Observable<HttpResponse<Misc[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Misc[]>(
      `https://healthhomeapi.herokuapp.com/api/hospital`,
      { headers, observe: 'response' }
    );
  }

  getPathologies(): Observable<HttpResponse<Misc[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Misc[]>(
      `https://healthhomeapi.herokuapp.com/api/pathologies`,
      { headers, observe: 'response' }
    );
  }

  getPartnerService(): Observable<HttpResponse<Misc[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Misc[]>(
      `https://healthhomeapi.herokuapp.com/api/partnerService`,
      { headers, observe: 'response' }
    );
  }

  getEmergencyService(): Observable<HttpResponse<Misc[]>> {
    const headers = {
      'Content-type': 'application/json',
      ['Authorization']: this.token,
    };
    return this.http.get<Misc[]>(
      `https://healthhomeapi.herokuapp.com/api/emergencyService`,
      { headers, observe: 'response' }
    );
  }
}
