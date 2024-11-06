import { Component } from '@angular/core';
import { ComplaintAttachmentService } from '../../services/complaintAttachnmentService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  templateUrl: './evidencia.component.html',
  styleUrl: './evidencia.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, FormsModule, MatButtonModule],

})
export class EvidenciaComponent {
  archivosSeleccionados: File[] = [];
  descripcionesArchivos: string = "";
  descripcionGeneral: string = '';
  submit: boolean = false;

  constructor(
    private complaintAttachmentService: ComplaintAttachmentService,
    private dataService : ComplaintDataService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.archivosSeleccionados = this.archivosSeleccionados.concat(Array.from(input.files));
    }
  }

  onChangeDescription(event: any) {
    this.descripcionesArchivos = event.target.value;
  }

  onSubmit(): void {
    if (this.archivosSeleccionados.length === 0) {
      alert('Por favor selecciona archivos');
      return;
      // this.router.navigate(['/successreport']);
    }

    if (!this.descripcionesArchivos) {
      alert('Por favor ingresa una descripción');
      return;
    }

    let complaint = this.dataService.getComplaintData();
    this.submit = true;

    this.complaintAttachmentService.uploadAttachments(complaint.Id, this.archivosSeleccionados, this.descripcionesArchivos)
      .subscribe(
        (response) => {
          console.log('Archivos subidos con éxito:', response);
          this.router.navigate(['/successreport']);
        },
        (error) => {
          console.error('Error al subir archivos:', error);
          this.submit = false;
        }
      );
  }
}
