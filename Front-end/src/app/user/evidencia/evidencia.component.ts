import { Component, OnInit } from '@angular/core';
import { ComplaintAttachmentService } from '../../services/complaintAttachnmentService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComplaintService } from '../../services/complaint.service';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-evidencia',
  standalone: true,
  templateUrl: './evidencia.component.html',
  styleUrl: './evidencia.component.css',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    NotifierModule,
  ],
})
export class EvidenciaComponent implements OnInit {
  archivosSeleccionados: File[] = [];
  descripcionesArchivos: string = '';
  descripcionGeneral: string = '';
  submit: boolean = false;

  constructor(
    private complaintAttachmentService: ComplaintAttachmentService,
    private complaintDataService: ComplaintDataService,
    private complaintService: ComplaintService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var currentComplaintData = this.complaintDataService.getComplaintData();
    if (!currentComplaintData || !currentComplaintData.contactEmail)
      this.goBack();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.archivosSeleccionados = this.archivosSeleccionados.concat(
        Array.from(input.files)
      );
    }
  }

  onChangeDescription(event: any) {
    this.descripcionesArchivos = event.target.value;
  }

  onSubmit(): void {
    if (this.archivosSeleccionados.length === 0) {
      this.notifier.notify('error', 'Por favor selecciona archivos');
      return;
    }

    if (!this.descripcionesArchivos) {
      this.notifier.notify('error', 'Por favor ingresa una descripción');
      return;
    }

    let complaint = this.complaintDataService.getComplaintData();
    this.submit = true;

    this.complaintService.createComplaint(complaint).subscribe(
      (response) => {
        this.complaintDataService.setId(response.content);
        this.saveAttachments(response.content);
      },
      (error) => {
        this.notifier.notify('error', 'Error al enviar la denuncia');
        console.error('Error al enviar la denuncia:', error);
        this.submit = false;
      }
    );
  }

  saveAttachments(complaintId: number): void {
    this.complaintAttachmentService
      .uploadAttachments(
        complaintId,
        this.archivosSeleccionados,
        this.descripcionesArchivos
      )
      .subscribe(
        (response) => {
          this.router.navigate(['/successreport']);
        },
        (error) => {
          this.notifier.notify('error', 'Error al subir archivos');
          console.error('Error al subir archivos:', error);
          this.submit = false;
        }
      );
  }

  goBack() {
    this.router.navigate(['/denunciante']);
  }
}
