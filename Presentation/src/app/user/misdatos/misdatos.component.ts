import { Component, EventEmitter ,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-misdatos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './misdatos.component.html',
  styleUrl: './misdatos.component.css'
})
export class MisdatosComponent {
  
  nombre: string = '';
  apellido: string = '';
  estado: string = '';
  cargo: string = '';
  area: string = '';
  sexo: string = ''; 
  contacto: string = '';

  @Output() cerrar = new EventEmitter<void>();

  guardarDatos() {
    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      estado: this.estado,
      cargo: this.cargo,
      area: this.area,
      sexo: this.sexo,
      contacto: this.contacto,
    };
    
    console.log(userData); 
    this.cerrar.emit(); 
  }
}
