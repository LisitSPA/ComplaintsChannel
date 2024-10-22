import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdmin {
Name = "";
Rol = "";



  constructor(userData: UserDataService){
    let user = userData.getUserData();
    this.Name = user.completeName
    this.Rol = user.userType


  }

}
