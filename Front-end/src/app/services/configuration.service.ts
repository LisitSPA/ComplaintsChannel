import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private apiUrl = environment.apiUrl+'/configuration';
  private color = '#4C3DB2';
  private logoUrl = '/icons/Logo_adm.svg';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
  }

  getConfiguration(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(this.apiUrl+'/getAll', {headers});
  }

  updateConfiguration(data: any): Observable<any> {    
    const headers = this.headers;
    const formData = new FormData();

    formData.append('color', data.color);

    if (data.logo)
      formData.append('logo', data.logo, data.logo.fileName);

    return this.http.post<any>('https://cdd-api.lisit-digital.cl/api/configuration', formData, {headers});
  }
  
  updateDefaultColor(color?: string): void {
    document.documentElement.style.setProperty(`--primary-color`, color || this.color);
    document.documentElement.style.setProperty(`--mat-icon-color`, color || this.color);
  }

  public get getColor(): string {
    return this.color;
  }

  public set setColor(color: string) {
    this.color = color;
  }

  public get getLogoUrl(): string {
    return this.logoUrl;
  }

  public set setLogoUrl(logoUrl: string) {
    this.logoUrl = logoUrl;
  }
}
