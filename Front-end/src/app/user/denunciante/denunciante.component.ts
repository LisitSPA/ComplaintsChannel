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
  styleUrls: ['./denunciante.component.css']
})
export class DenuncianteComponent {
  mostrarFormulario: boolean = false;
  contactEmail: string = '';
  deseoCodigoSeguimiento: boolean = false;
  isAnonymous: boolean = false;
  eCompanyStatus: number = 1;  // Estado en la empresa
  selectedSex: string = '';  // Sexo seleccionado

  constructor(
    private complaintDataService: ComplaintDataService, 
    private complaintService: ComplaintService,  
    private router: Router
  ) {}

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.isAnonymous = true;  // Si selecciona identificarse, no es anónima
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  setDenunciaAnonima() {
    this.isAnonymous = true;
    this.mostrarFormulario = false;  
  }

  // enviarDenuncia() {
  //   const datosCompletos = this.complaintDataService.getComplaintData();

  //   console.log('Datos enviados al backend:', datosCompletos);

  //   this.complaintService.submitComplaint(datosCompletos).subscribe(
  //     (response) => {
  //       console.log('Denuncia enviada con éxito:', response);
  //       this.router.navigate(['/evidencias']);  
  //     },
  //     (error) => {
  //       console.error('Error al enviar la denuncia:', error);
  //     }
  //   );
  // }

  guardarYRedirigir() {
    console.log('Tipo de denuncia:', this.isAnonymous ? 'Anónima' : 'Identificada');
    console.log('Correo electrónico ingresado:', this.contactEmail);
    console.log('Estado en la empresa:', this.eCompanyStatus);
    console.log('Sexo (si es anónima):', this.selectedSex);

    // Guardar los datos incluyendo el estado de la empresa y el sexo (si es anónima)
    this.complaintDataService.setComplaintData({
      isAnonymous: this.isAnonymous,
      contactEmail: this.contactEmail,
      deseoCodigoSeguimiento: this.deseoCodigoSeguimiento,
      eCompanyStatus: this.eCompanyStatus,
      eGenre: this.selectedSex  // Guardar el sexo seleccionado
    });

    let data = this.complaintDataService.getComplaintData();

    this.complaintService.createComplaint(data).subscribe(
      (response) => {
        console.log('Denuncia enviada con éxito:', response);
        this.complaintDataService.setId(response.content)
        this.router.navigate(['/evidencia']);  
      },
      (error) => {
        console.error('Error al enviar la denuncia:', error);
      }
    );
  }
}