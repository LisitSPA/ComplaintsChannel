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
   

   
}
