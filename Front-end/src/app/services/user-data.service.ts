import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  

  private user: any = {};

  setUserData(data: any) {
    this.user = { ...data };
    console.log(this.user)
  }

  getUserData() {
    console.log(this.user)
    return this.user;
  }

}
