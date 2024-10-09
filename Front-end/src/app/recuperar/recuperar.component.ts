import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css'],
  imports: [CommonModule, FormsModule],  
})
export class RecuperarComponent {
  username: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private http: HttpClient) {}

  recuperarContrasenia() {
    const recoveryCommand = {
      username: this.username
    };

    this.http.post('https://cdd-api.lisit-digital.cl/api/auth/passwordRecovery', recoveryCommand)
      .subscribe(
        (response: any) => {
          this.mensajeExito = 'Se han enviado las indicaciones a tu correo electrónico.';
          this.mensajeError = ''; 
        },
        (error) => {
          if (error.status === 404) {
            this.mensajeError = 'Usuario no encontrado. Por favor, verifica tu correo electrónico.';
          } else {
            this.mensajeError = 'Ocurrió un error. Inténtalo más tarde.';
          }
          this.mensajeExito = ''; 
        }
      );
  }
}
