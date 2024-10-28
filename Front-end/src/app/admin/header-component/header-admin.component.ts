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
Name : string | undefined;
Rol : string | undefined;



  constructor(){
    this.Name = sessionStorage.getItem("name")?.toString()
    this.Rol = sessionStorage.getItem("role")?.toString()


  }

}
