import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { environment } from '../../environment/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],  
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  mensajeError = '';
  submit: boolean = false;

  constructor(
    private http: HttpClient,
     private router: Router,
     private userData: UserDataService
    ) {}

  gotoHome() {
    const loginCommand = {
      username: this.usuario.email,
      password: this.usuario.password
    };
    this.submit = true;

    this.http.post(environment.apiUrl+'/auth/login', loginCommand)
      .subscribe(
        (response: any) => {
          
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('email', this.usuario.email);
          sessionStorage.setItem('name', response.user.completeName);
          sessionStorage.setItem('role', response.user.userType);
          
          this.router.navigate(['/homeadmin']);
        },
        (error) => {
          console.error('Error en el login:', error);
          this.submit = false;
          if (error.status === 401) {
            this.mensajeError = 'Credenciales incorrectas. Intenta nuevamente.';
          } else {
            this.mensajeError = 'Ocurrió un error. Inténtalo más tarde.';
          }
        }
      );
  }
}
