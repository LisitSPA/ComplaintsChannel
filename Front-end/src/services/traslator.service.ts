import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { lastValueFrom } from 'rxjs';
import { ELanguageType } from '../types/language.type';


@Injectable({ providedIn: 'root' })
export class TraslatorService {
    constructor(private _httpClient: HttpClient, ) { }
   

    traslateText(text: string[], language: ELanguageType): Promise<any> {
        var data = {
            text,
            language 
        }
        return lastValueFrom(this._httpClient.post(
            `${environment.apiUrl}/complaints/`, data
        ));
    }

   
}
