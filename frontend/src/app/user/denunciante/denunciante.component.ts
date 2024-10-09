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
    this.isAnonymous = false;  // Si se abre el formulario, no es anónimo.
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  setDenunciaAnonima() {
    this.isAnonymous = true;
    this.mostrarFormulario = false;  // Si es anónima, no se muestran más datos.
  }

  enviarDenuncia() {
    const datosCompletos = this.complaintDataService.getComplaintData();

    // Log para verificar los datos guardados antes de enviarlos
    console.log('Datos enviados al backend:', datosCompletos);

    this.complaintService.submitComplaint(datosCompletos).subscribe(
      (response) => {
        console.log('Denuncia enviada con éxito:', response);
        this.router.navigate(['/successreport']);  // Redirigir a la página de éxito
      },
      (error) => {
        console.error('Error al enviar la denuncia:', error);
      }
    );
  }

  guardarYRedirigir() {
    if (this.isAnonymous) {
      // Si la denuncia es anónima, no se rellenan los datos del denunciante
      this.complaintDataService.setComplaintData({
        isAnonymous: true,
        contactEmail: this.contactEmail,
        complainant: null  // No incluimos los datos de complainant si es anónimo
      });
    } else {
      // Si no es anónima, se guarda con los datos del denunciante
      this.complaintDataService.setComplaintData({
        isAnonymous: false,
        contactEmail: this.contactEmail,
        deseoCodigoSeguimiento: this.deseoCodigoSeguimiento
      });
    }

    this.enviarDenuncia();
  }
}
