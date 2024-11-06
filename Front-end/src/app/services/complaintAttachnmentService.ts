import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintAttachmentService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/complaints/attachments';

  constructor(private http: HttpClient) {}

  uploadAttachments(complaintId: number, files: File[], descriptions: string): Observable<any> {
    const formData = new FormData();

    formData.append('ComplaintId', complaintId.toString());

    files.forEach((file, index) => {
      formData.append('Attachments', file, file.name);
    });

    formData.append('AttachDescription', descriptions);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
