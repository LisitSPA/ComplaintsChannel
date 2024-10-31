import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { RequestComplaint, RequestEvidencies, ResponseComplaint } from '../../types/complaint.type';
import { ApiResponse } from '../../types/api-response.type';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = environment.apiUrl;
  private language = "es"
  headers: any;
 
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage?.getItem('token')}`,
    });
  }

  getAllComplaints(): Observable<any> {
    const headers = this.headers;
    return (this.http.get(
      `${environment.apiUrl}/complaints/getAll/`, {headers}
    ));
  }
  
  async getAllComplaintsPromise(params : HttpParams): Promise<any> {   
    const headers = this.headers;
    let res = await (lastValueFrom(this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/complaints/getAll`,{headers, params}
    )));

    console.log({res});
    return res?.content;
  }
  
  
  async getReasonsComplaints(): Promise<any> {
    let res = await (lastValueFrom(this.http.get<ApiResponse<any>>(
      `${environment.apiUrl}/complaints/types/all/${this.language}`
    )));
    return res?.content;
  }

  filterComplaintsByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filterByStatus?status=${status}`);
  }
  
  filterComplaintsByField(field: string, value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filterByField?field=${field}&value=${value}`);
  }

  createComplaint(data: RequestComplaint): Observable<any> {    
    return this.http.post<any>(this.apiUrl+'/complaints', data);
  }

  updateStatus(data: any): Observable<any> {    
    const headers = this.headers;
    const formData = new FormData();

    formData.append('ComplaintId', data.complaintId); 
    formData.append('eComplaintStatus', data.eComplaintStatus);
    formData.append('notes', data.notes);
    data.attachments.forEach((file: any) => {
      formData.append('Attachments', file, file.name);
    });

    return this.http.post<any>(this.apiUrl+'/complaints/updateStatus', formData, {headers});
  }

  addAttachments(file: RequestEvidencies): Promise<any> {
      const formData = new FormData();
      //formData.append("fileData", file);
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
