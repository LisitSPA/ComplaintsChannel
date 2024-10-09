import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiUrl = 'https://cdd-api.lisit-digital.cl/api/translator/TranslateText';

  constructor(private http: HttpClient) {}

  translateText(language: string, text: string): Observable<any> {
    const payload = {
      language: language,
      text: [text] 
    };

    return this.http.post<any>(this.apiUrl, payload);
  }
}
