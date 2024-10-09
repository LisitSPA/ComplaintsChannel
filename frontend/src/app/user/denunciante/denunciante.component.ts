import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { MisdatosComponent } from '../misdatos/misdatos.component';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { ComplaintService } from '../../services/complaint.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-denunciante',
  standalone: true,
  imports: [CommonModule, FormsModule, MisdatosComponent],
  templateUrl: './denunciante.component.html',
  styleUrl: './denunciante.component.css'
})
export class DenuncianteComponent {
  mostrarFormulario: boolean = false;
  contactEmail: string = '';
  deseoCodigoSeguimiento: boolean = false;
  isAnonymous: boolean = false;

  constructor(
    private complaintDataService: ComplaintDataService, 
    private complaintService: ComplaintService,  
    private router: Router
  ) {}

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.isAnonymous = false;  
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  setDenunciaAnonima() {
    this.isAnonymous = true;
    this.mostrarFormulario = false;  
  }

  enviarDenuncia() {
    const datosCompletos = this.complaintDataService.getComplaintData();

    console.log('Datos enviados al backend:', datosCompletos);

    this.complaintService.submitComplaint(datosCompletos).subscribe(
      (response) => {
        console.log('Denuncia enviada con éxito:', response);
        this.router.navigate(['/successreport']);  
      },
      (error) => {
        console.error('Error al enviar la denuncia:', error);
      }
    );
  }

  guardarYRedirigir() {
    if (this.isAnonymous) {
      this.complaintDataService.setComplaintData({
        isAnonymous: true,
        contactEmail: this.contactEmail,
        complainant: null  
      });
    } else {
      this.complaintDataService.setComplaintData({
        isAnonymous: false,
        contactEmail: this.contactEmail,
        deseoCodigoSeguimiento: this.deseoCodigoSeguimiento
      });
    }

    this.enviarDenuncia();
  }
}
