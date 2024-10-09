import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/complaints';

  constructor(private http: HttpClient) {}

  submitComplaint(complaintData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, complaintData);
  }
   getAllComplaints(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`);
  }
  
  filterComplaintsByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filterByStatus?status=${status}`);
  }
  
  filterComplaintsByField(field: string, value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filterByField?field=${field}&value=${value}`);
  }
}
