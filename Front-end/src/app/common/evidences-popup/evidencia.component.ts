import { Component, EventEmitter, Output } from '@angular/core';
import { ComplaintAttachmentService } from '../../services/complaintAttachnmentService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComplaintService } from '../../services/complaint.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-evidencia-popup',
  standalone: true,
  templateUrl: './evidencia.component.html',
  styleUrl: './evidencia.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatButtonModule, MatIconModule],

})
export class EvidenciaPopupComponent {
  archivosSeleccionados: File[] = [];
  descripcionesArchivos: string[] = [];
  descripcionGeneral: string = '';
  submit: boolean = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  notes: any;

  constructor(
    private complaintAttachmentService: ComplaintAttachmentService,
    private complaintService: ComplaintService,
    private dataService : ComplaintDataService,
    private router: Router
  ) {}

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

    let complaint = this.dataService.getComplaintData();
    this.submit = true;

    let data = {
      complaintId : complaint.Id,
      eComplaintStatus : 31,
      notes: this.notes,
      attachments: this.archivosSeleccionados
    };

    // this.complaintAttachmentService.uploadAttachments(complaint.Id, this.archivosSeleccionados, ["evidencia al desestimar la denuncia"])
    // .subscribe(
    //   (response) => {
    //     console.log('Archivos subidos con éxito:', response);
    //   },
    //   (error) => {
    //     console.error('Error al subir archivos:', error);
    //     this.submit = false;
    //   }
    // );

    this.complaintService.updateStatus(data).subscribe(
      (response) => {
        console.log('Denuncia actualizada correctamente:', response);
        this.guardar.emit();
      },
      (error) => {
        console.error('Error al actulizar la denuncia:', error);
      }
    );


  }
}
