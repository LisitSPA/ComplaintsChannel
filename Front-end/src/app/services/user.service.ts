import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+'/users';

  constructor(private http: HttpClient) {}
 
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, userData); 
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`; 
    return this.http.delete<any>(url);  
  }

  changePassword(data: any): Observable<any>{
    const url = `${this.apiUrl}/auth/changePassword`;
    return this.http.put(url, data); 
  }
}
