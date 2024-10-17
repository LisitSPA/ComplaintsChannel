import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../../types/api-response.type';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.apiUrl+'/chat';
  headers: HttpHeaders;
  language = 'es'

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
  }
  
  getAllChats(language: string): Observable<any> {
    let headers = this.headers
    return this.http.get(`${this.apiUrl}/getAll/${language}`,{ headers });
  }

  getChatByUser(userId: number, language: string): Observable<any> {
    let headers = this.headers
    return this.http.get(`${this.apiUrl}/getByUser/${userId}/${language}`,{ headers });
  }

  async getChatByComplaintCode(complaintCode: string): Promise<any> {
    let headers = this.headers
   
    let res = await lastValueFrom(this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/${complaintCode}/${this.language}`,{headers}
    ));

    return res?.content;
  }

  sendChatResponse(complaintCode: string, message: string, file: any): Observable<any> {
    let headers = this.headers
    const formData = new FormData();
    formData.append("ComplaintCode", complaintCode);
    formData.append("Message", message);
    formData.append("file", file);

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
