import { Component, EventEmitter ,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  
  nombre: string = '';
  tipo: string = '';
  estado: string = '';
  sexo: string = ''; 
  email: string = '';

  @Output() cerrar = new EventEmitter<void>();

  guardarDatos() {
    const userData = {
      nombre: this.nombre,
      tipo: this.tipo,
      estado: this.estado,
      sexo: this.sexo,
      email: this.email,
    };
    
    console.log(userData); 
    this.cerrar.emit(); 
  }
}
