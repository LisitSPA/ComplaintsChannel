import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { lastValueFrom } from 'rxjs';
import { ELanguageType } from '../types/language.type';
import { ChatResponse } from '../types/chat.type';
import { ApiResponse } from '../types/api-response.type';


@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private _httpClient: HttpClient, ) { }
   

    async getChatByComplaintCode(code: string, language: ELanguageType): Promise<ChatResponse> {
       
        let res = await lastValueFrom(this._httpClient.get<ApiResponse<ChatResponse>>(
            `${environment.apiUrl}/chat/${code}/${language}`
        ));
    
        return res?.content;

    }

   
}
