import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { environment } from '../../environment/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    NotifierModule,
  ],
})
export class LoginComponent {
  usuario = {
    email: '',
    password: '',
  };
  submit: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    const isReloaded = sessionStorage?.getItem('isReloaded');

    // if (window !== undefined && !isReloaded) {
    //   sessionStorage.setItem('isReloaded', 'true');
    //   window.location.reload();
    // }
  }

  gotoHome() {
    const loginCommand = {
      username: this.usuario.email,
      password: this.usuario.password,
    };
    this.submit = true;

    this.http.post(environment.apiUrl + '/auth/login', loginCommand).subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('email', this.usuario.email);
        sessionStorage.setItem('name', response.user.completeName);
        sessionStorage.setItem('role', response.user.userType);
        
        if(response.user.changePassword)
          sessionStorage.setItem('mustChangePassword', response.user.changePassword);

        this.router.navigate(['/homeadmin']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error en el login:', error);
        this.submit = false;
        if (error.status === 401) {
          this.notifier.notify(
            'error',
            'Credenciales incorrectas. Intenta nuevamente.'
          );
        } else {
          this.notifier.notify(
            'error',
            'Ocurrió un error. Inténtalo más tarde.'
          );
        }
      }
    );
  }
}
