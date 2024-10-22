import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  @Input() usuario: any = {};  
  @Output() cerrar = new EventEmitter<void>();

  nombre: string = this.usuario.completeName;
  tipo: string = this.usuario.eUserType;  
  estado: string = this.usuario.eCompanyStatus;  
  sexo: string =  this.usuario.eGenre; 
  email: string = this.usuario.contactEmail;

  constructor(private userService: UserService, private router: Router) {
    console.log(this.usuario)
  }

  // ngOnChanges() {
  //   if (this.usuario) {
  //     this.nombre = this.usuario.nombre;
  //     this.tipo = this.usuario.tipo;
  //     this.estado = this.usuario.estado;
  //     this.email = this.usuario.email;
  //     this.sexo = this.usuario.sexo === 'Masculino' ? 'Masculino' : 'Femenino';
  //   }
  // }

  guardarDatos() {
    const userData = {
      name: this.nombre,
      eUserType: parseInt(this.tipo),  
      active: this.estado,  
      eGenre: parseInt(this.sexo), 
      email: this.email
    };

    console.log('Datos del usuario antes de enviar:', userData);

    this.userService.updateUser(this.usuario.id, userData).subscribe(
      response => {
        console.log('Usuario actualizado con éxito:', response); 
        this.cerrar.emit();  
        this.router.navigate(['/users']);  
      },
      error => {
        console.error('Error al actualizar usuario:', error);  
      }
    );
  }
}
