import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComplaintService } from '../../services/complaint.service';
import { requestStates } from '../../../constants/requestState';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-change-state-popup',
  standalone: true,
  templateUrl: './changeState.component.html',
  styleUrl: './changeState.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatButtonModule, NotifierModule],
 
})
export class ChangeStatePopupComponent {
  descripcionesArchivos: string[] = [];
  descripcionGeneral: string = '';
  complaint: any;
  status : number | undefined;
  submit: boolean = false;
  states = requestStates;  

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  notes: any;

  constructor(
    private complaintService: ComplaintService, 
    private dataService : ComplaintDataService,
    private notifier: NotifierService,
  ) {
    this.complaint = this.dataService.getComplaintData();
  }

  onDescripcionCambiada(event: any, index: number) {
    this.descripcionesArchivos[index] = event.target.value;
  }

  onSubmit(): void {
    if (!this.status || !requestStates.some(x => x.value == this.status)) {
      this.notifier.notify('error', 'Por favor selecciona un estado');
      return;
    }

    if (!this.notes) {
      this.notifier.notify('error', 'Por favor ingresa una nota');
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
        this.notifier.notify('success', 'Denuncia actualizada correctamente'); 
        this.guardar.emit();  
      },
      (error) => {
        console.error('Error al actulizar la denuncia:', error);
        this.notifier.notify('success', 'Error al actulizar la denuncia');
        this.submit = false;   
      }
    );   
  }
}
