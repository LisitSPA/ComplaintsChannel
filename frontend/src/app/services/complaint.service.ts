import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/complaints';

  constructor(private http: HttpClient) {}

  // Método para enviar la denuncia
  submitComplaint(complaintData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, complaintData);
  }
}
