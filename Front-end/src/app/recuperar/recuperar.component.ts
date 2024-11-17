import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css'],
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, NotifierModule],  
})
export class RecuperarComponent {
  username: string = '';
  submit: boolean = false;

  constructor(private http: HttpClient, private notifier: NotifierService) {}

  recuperarContrasenia() {
    if (!this.username) {
      this.notifier.notify('error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    const recoveryCommand = {
      username: this.username
    };

    this.submit = true;

    this.http.post('https://cdd-api.lisit-digital.cl/api/auth/passwordRecovery', recoveryCommand)
      .subscribe(
        (response: any) => {
          this.notifier.notify('success', 'Se han enviado las indicaciones a tu correo electrónico.');
        },
        (error) => {
          if (error.status === 404 || error.status === 400) {
            this.notifier.notify('error', 'Usuario no encontrado. Por favor, verifica tu correo electrónico.');
          } else {
            this.notifier.notify('error', 'Ocurrió un error, Por favor, verifica tu correo electrónico e Inténtalo más tarde.');
          }
          this.submit = false;
        },
        () => this.submit = false
      );
  }
}
