import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  

  private user: any = {};

  setUserData(data: any) {
    this.user = data;
  }

  getUserData() {
    return this.user;
  }

}
