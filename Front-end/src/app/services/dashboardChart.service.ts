import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/dashboard';

  constructor(private http: HttpClient) {}

  getChartByArea(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chartByArea`);
  }

  getChartByPosition(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chartByPosition`);
  }
}
