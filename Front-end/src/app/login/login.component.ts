import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  mensajeError = '';

  constructor(private router: Router, private http: HttpClient) {}
  
  //TODO: falta traer los datos del formulario
  gotoHome() {
    const loginCommand = {
      username: this.usuario.email,
      password: this.usuario.password
    };

    this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, loginCommand)
    .subscribe(response => {
      localStorage.setItem('token', response.token); 
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    }, error => {
      this.mensajeError = 'Correo electrónico o contraseña incorrectos';
      console.error(error);
    });

  }
}
