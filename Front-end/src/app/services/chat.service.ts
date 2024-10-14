import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/chat';

  constructor(private http: HttpClient) {}

  getAllChats(language: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll/${language}`);
  }

  getChatByUser(userId: number, language: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getByUser/${userId}/${language}`);
  }

  getChatByComplaintCode(complaintCode: string, language: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${complaintCode}/${language}`);
  }

  sendChatResponse(complaintCode: string, message: string): Observable<any> {
    const payload = {
      ComplaintCode: complaintCode,
      Message: message
    };
    return this.http.post(this.apiUrl, payload);
  }
}
