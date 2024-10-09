import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/dashboard/countComplaints';

  constructor(private http: HttpClient) {}

  getCountComplaints(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
