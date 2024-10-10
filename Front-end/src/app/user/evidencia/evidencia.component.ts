import { Component } from '@angular/core';
import { ComplaintAttachmentService } from '../../services/complaintAttachnmentService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  templateUrl: './evidencia.component.html',
  styleUrl: './evidencia.component.css',
  imports: [CommonModule],
 
})
export class EvidenciaComponent {
  archivosSeleccionados: File[] = [];
  descripcionesArchivos: string[] = [];
  complaintId: number = 123;  
  descripcionGeneral: string = '';

  constructor(private complaintAttachmentService: ComplaintAttachmentService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.archivosSeleccionados = this.archivosSeleccionados.concat(Array.from(input.files));
    }
  }

  onDescripcionCambiada(event: any, index: number) {
    this.descripcionesArchivos[index] = event.target.value;
  }

  onSubmit(): void {
    if (this.archivosSeleccionados.length === 0) {
      alert('Por favor selecciona archivos');
      return;
    }

    console.log('ComplaintId:', this.complaintId);
    console.log('Archivos seleccionados:', this.archivosSeleccionados);
    console.log('Descripciones de archivos:', this.descripcionesArchivos);

    this.complaintAttachmentService.uploadAttachments(this.complaintId, this.archivosSeleccionados, this.descripcionesArchivos)
      .subscribe(
        (response) => {
          console.log('Archivos subidos con éxito:', response);
          this.router.navigate(['/successreport']);
        },
        (error) => {
          console.error('Error al subir archivos:', error);
        }
      );
  }
}
