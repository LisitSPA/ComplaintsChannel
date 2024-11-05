import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComplaintService } from '../../services/complaint.service';
import { requestStates } from '../../../constants/requestState';

@Component({
  selector: 'app-change-state-popup',
  standalone: true,
  templateUrl: './changeState.component.html',
  styleUrl: './changeState.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatButtonModule],
 
})
export class ChangeStatePopupComponent {
  descripcionesArchivos: string[] = [];
  descripcionGeneral: string = '';
  complaint: any;
  mensajeError: string | undefined;
  mensajeExito: string | undefined;
  status : number | undefined;
  submit: boolean = false;
  states = requestStates;  

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  notes: any;

  constructor(
    private complaintService: ComplaintService, 
    private dataService : ComplaintDataService
  ) {
    this.complaint = this.dataService.getComplaintData();
  }

  onDescripcionCambiada(event: any, index: number) {
    this.descripcionesArchivos[index] = event.target.value;
  }

  onSubmit(): void {
    if (!this.status || !requestStates.some(x => x.value == this.status)) {
      this.mensajeError = 'Por favor selecciona un estado';
      return;
    }

    if (!this.notes) {
      this.mensajeError = 'Por favor ingresa una nota';
      return;
    }

    this.submit = true;

    let data = {
      complaintId : this.complaint.Id,
      eComplaintStatus : this.status,
      notes: this.notes    
    };

    this.complaintService.updateStatus(data).subscribe(
      (response) => {
        console.log('Denuncia actualizada correctamente:', response);
        this.mensajeExito = 'Denuncia actualizada correctamente';   
        this.guardar.emit();  
      },
      (error) => {
        console.error('Error al actulizar la denuncia:', error);
        this.mensajeError = 'Error al actualizar la denuncia';
        this.submit = false;   
      }
    );   
  }
}
