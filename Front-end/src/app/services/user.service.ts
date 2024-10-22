import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+'/users';
  private headers : HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
  }

  private language : string = "es"
 
  getUsers(params: HttpParams): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}/all`, {headers, params});
  }

  getUserById(userId: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.apiUrl}/${userId}`, {headers});
  }


  createUser(userData: any): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(this.apiUrl, userData, {headers});
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = this.headers;
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, userData,{headers}); 
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.headers;
    const url = `${this.apiUrl}/${userId},`; 
    return this.http.delete<any>(url,{headers});  
  }

  changePassword(data: any): Observable<any>{
   
    const headers = this.headers;

    const url = `${environment.apiUrl}/auth/changePassword`;
    console.log(this.http)
    return this.http.post(url, data,{headers}); 
  }
}
