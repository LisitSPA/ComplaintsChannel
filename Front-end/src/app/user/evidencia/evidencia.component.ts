import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-evidencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evidencia.component.html',
  styleUrl: './evidencia.component.css'
})
export class EvidenciaComponent {
  archivosSeleccionados: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.archivosSeleccionados = this.archivosSeleccionados.concat(Array.from(input.files));
    }
  }

}
