import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-involucrados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './involucrados.component.html',
  styleUrls: ['./involucrados.component.css']
})
export class InvolucradosComponent {
  personas: string[] = ['Nombre1', 'Nombre2', 'Nombre3', 'Nombre4'];
  personasSeleccionadas: string[] = [];

  actualizarSeleccion(persona: string, event: Event) {
    const checkbox = (event.target as HTMLInputElement);
    if (checkbox.checked) {
      this.personasSeleccionadas.push(persona);
    } else {
      this.personasSeleccionadas = this.personasSeleccionadas.filter(p => p !== persona);
    }
  }
}
