import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  @Input() usuario: any;  
  @Output() cerrar = new EventEmitter<void>();

  nombre = ""
  tipo = 0;  
  estado = 0;  
  sexo =  0; 
  email = "";

  constructor(private userService: UserService, private router: Router) {
    
  }

  ngOnInit(): void {
    console.log(this.usuario)

    this.nombre = this.usuario.completeName;
    this.tipo = this.usuario.eUserType;  
    this.estado = this.usuario.eCompanyStatus;  
    this.sexo =  this.usuario.eGenre; 
    this.email = this.usuario.contactEmail;

  }

  guardarDatos() {
    const userData = {
      name: this.nombre,
      eUserType: this.tipo,  
      status: this.estado,  
      eGenre: this.sexo, 
      email: this.email,
      id: this.usuario.id
    };

    console.log('Datos del usuario antes de enviar:', userData);

    if(this.usuario?.id)
      this.userService.updateUser(userData).subscribe(
        response => {
          console.log('Usuario actualizado con éxito:', response); 
          this.cerrar.emit()
        },
        error => {
          console.error('Error al actualizar usuario:', error);  
        }
      );
    else
      this.userService.createUser(userData).subscribe(
        response => {
          console.log('Usuario creado con éxito:', response); 
          this.cerrar.emit() 
        },
        error => {
          console.error('Error al crear usuario:', error);  
        }
      );
  }

  
}
