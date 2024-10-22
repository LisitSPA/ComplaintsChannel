import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  
  nombre: string = '';
  tipo: string = '';  
  estado: number = 1;  
  sexo: string = '';  
  email: string = '';
  active: boolean = true;  

  @Output() cerrar = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) {}

  guardarDatos() {
    const userData = {
      name: this.nombre,
      eUserType: parseInt(this.tipo),  
      active: this.estado,  
      eGenre: parseInt(this.sexo), 
      email: this.email
    };

    console.log('Datos del usuario antes de enviar:', userData);

    this.userService.createUser(userData).subscribe(
      response => {
        console.log('Usuario creado con éxito:', response); 
        this.cerrar.emit(); 
        this.router.navigate(['/users']);  
      },
      error => {
        console.error('Error al crear usuario:', error);  
      }
    );
  }
}
