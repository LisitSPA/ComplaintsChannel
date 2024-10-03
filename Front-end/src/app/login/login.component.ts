import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  mensajeError = '';


  gotoHome() {
    const loginCommand = {
      username: this.usuario.email,
      password: this.usuario.password
    };

  }
}
