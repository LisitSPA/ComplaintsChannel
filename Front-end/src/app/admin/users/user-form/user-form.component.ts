import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';
import genreTypes from '../../../../types/genreTypes';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatRadioModule, NotifierModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  @Input() usuario: any;  
  @Output() cerrar = new EventEmitter<void>();

  nombre = ""
  tipo = 1;  
  estado = 1;  
  sexo =  ""; 
  email = "";
  genreTypeValues = genreTypes;

  constructor(private userService: UserService, private router: Router, private notifier: NotifierService) {
    
  }

  ngOnInit(): void {
    this.nombre = this.usuario.completeName || '';
    this.tipo = this.usuario.eUserType || 0;  
    this.estado = this.usuario.eCompanyStatus || 0;  
    this.sexo = this.usuario.eGenre || 0;
    this.email = this.usuario.contactEmail || "";

  }

  guardarDatos() {
    if (!this.nombre || !this.tipo || !this.estado || !this.sexo || !this.email) {
      this.notifier.notify('error', 'Por favor ingresa todos los campos');
      return;
    }

    const userData = {
      name: this.nombre,
      eUserType: this.tipo,  
      status: this.estado,  
      eGenre: this.sexo, 
      email: this.email,
      id: this.usuario.id
    };


    if(this.usuario?.id)
      this.userService.updateUser(userData).subscribe(
        response => {
          this.notifier.notify('success', 'Usuario actualizado con éxito');
          this.cerrar.emit()
        },
        error => {
          this.notifier.notify('error', 'Error al actualizar usuario');
          console.error('Error al actualizar usuario:', error);  
        }
      );
    else
      this.userService.createUser(userData).subscribe(
        response => {
          this.notifier.notify('success', 'Usuario creado con éxito'); 
          this.cerrar.emit() 
        },
        error => {
          this.notifier.notify('error', 'Error al crear usuario');
          console.error('Error al crear usuario:', error);  
        }
      );
  }

  
}
