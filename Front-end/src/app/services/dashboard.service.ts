import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl+'/dashboard';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
  }

  getCountComplaints(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(this.apiUrl+'/countComplaints', {headers});
  }

  getChartByArea(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}/chartByArea`,{headers});
  }

  getChartByPosition(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}/chartByPosition`,{headers});
  }
}
