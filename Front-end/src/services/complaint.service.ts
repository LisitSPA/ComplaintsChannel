import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { lastValueFrom } from 'rxjs';
import {  RequestComplaint, RequestEvidencies, ResponseComplaint } from '../types/complaint.type';
import { ELanguageType } from '../types/language.type';
import { ApiResponse } from '../types/api-response.type';


@Injectable({ providedIn: 'root' })
export class ComplaintService {
    constructor(private _httpClient: HttpClient, ) { }
   

    createComplaint(data: RequestComplaint): Promise<any> {
        return lastValueFrom(this._httpClient.post(
            `${environment.apiUrl}/complaints/`, data
        ));
    }

    addAttachments(file: RequestEvidencies): Promise<any> {
        const formData = new FormData();
        // formData.append("fileData", file);

        return lastValueFrom(this._httpClient.put(
            `${environment.apiUrl}/complaints/Attachments/`, formData
        ));
    }

    async getComplaintByCode(code: string, language: ELanguageType): Promise<ResponseComplaint> {
        let res = await lastValueFrom(this._httpClient.get<ApiResponse<ResponseComplaint>>(
            `${environment.apiUrl}/complaints/${code}/${language}`
        ));
    
        return res?.content;

    }

    getAllEvidences(code: string){
        return lastValueFrom(this._httpClient.get(
            `${environment.filesUrl}/${code}`,
        ));
    }

    getAllEvidenceByFileName(code: string, fileName: string){
        return lastValueFrom(this._httpClient.get(
            `${environment.filesUrl}/${code}/${fileName}`,
        ));
    }
}
