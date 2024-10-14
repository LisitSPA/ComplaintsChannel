import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],  
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  mensajeError = '';

  constructor(private http: HttpClient, private router: Router) {}

  gotoHome() {
    const loginCommand = {
      username: this.usuario.email,
      password: this.usuario.password
    };

    this.http.post('https://cdd-api.lisit-digital.cl/api/auth/login', loginCommand)
      .subscribe(
        (response: any) => {
          console.log('Login exitoso:', response);
          
          localStorage.setItem('token', response.token);
          
          this.router.navigate(['/homeadmin']);
        },
        (error) => {
          console.error('Error en el login:', error);

          if (error.status === 401) {
            this.mensajeError = 'Credenciales incorrectas. Intenta nuevamente.';
          } else {
            this.mensajeError = 'Ocurrió un error. Inténtalo más tarde.';
          }
        }
      );
  }
}
