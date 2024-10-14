import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ELanguageType } from '../../types/language.type';
import { RequestComplaint, RequestEvidencies, ResponseComplaint } from '../../types/complaint.type';
import { ApiResponse } from '../../types/api-response.type';

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

  createComplaint(data: RequestComplaint): Promise<any> {
    return lastValueFrom(this.http.post(
        `${this.apiUrl}/complaints/`, data
    ));
  }

  addAttachments(file: RequestEvidencies): Promise<any> {
      const formData = new FormData();
      // formData.append("fileData", file);

      return lastValueFrom(this.http.put(
          `${environment.apiUrl}/complaints/Attachments/`, formData
      ));
  }

  async getComplaintByCode(code: string, language: string): Promise<ResponseComplaint> {
      let res = await lastValueFrom(this.http.get<ApiResponse<ResponseComplaint>>(
          `${environment.apiUrl}/complaints/${code}/${language}`
      ));

      return res?.content;

  }

  getAllEvidences(code: string){
      return lastValueFrom(this.http.get(
          `${environment.filesUrl}/${code}`,
      ));
  }

  getAllEvidenceByFileName(code: string, fileName: string){
      return lastValueFrom(this.http.get(
          `${environment.filesUrl}/${code}/${fileName}`,
      ));
  }

}
