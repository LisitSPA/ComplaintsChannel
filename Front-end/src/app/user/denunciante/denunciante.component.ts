import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { MisdatosComponent } from '../misdatos/misdatos.component';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { ComplaintService } from '../../services/complaint.service';  
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-denunciante',
  standalone: true,
  imports: [CommonModule, FormsModule, MisdatosComponent, MatProgressSpinnerModule, MatButtonModule, NotifierModule],
  templateUrl: './denunciante.component.html',
  styleUrls: ['./denunciante.component.css']
})
export class DenuncianteComponent implements OnInit {
  mostrarFormulario: boolean = false;
  contactEmail: string = '';
  deseoCodigoSeguimiento: boolean = false;
  isAnonymous: boolean = true;
  eCompanyStatus: number = 1;  // Estado en la empresa
  selectedSex: string = '';  // Sexo seleccionado

  constructor(
    private complaintDataService: ComplaintDataService,
    private notifier: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var currentComplaintData = this.complaintDataService.getComplaintData();

    if (!currentComplaintData || !currentComplaintData.personInvolveds?.length)
      this.goBack('/involucrados');

    this.contactEmail = currentComplaintData.contactEmail || '';
    this.isAnonymous = !currentComplaintData.isAnonymous ? false : true;
    this.deseoCodigoSeguimiento = currentComplaintData.deseoCodigoSeguimiento || false;
    this.eCompanyStatus = currentComplaintData.eCompanyStatus || 1;
    this.selectedSex = currentComplaintData.eGenre || '';
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.isAnonymous = false;  
  }

  cerrarFormulario(isAnonymous: boolean) {
    this.mostrarFormulario = false;
    this.isAnonymous = isAnonymous;
  }

  setDenunciaAnonima() {
    this.isAnonymous = true;
    this.mostrarFormulario = false;  
  }

  guardarYRedirigir() {
    if (!this.contactEmail) {
      this.notifier.notify('error', 'Por favor ingresa un correo electrónico');
      return;
    }

    // Guardar los datos incluyendo el estado de la empresa y el sexo (si es anónima)
    this.complaintDataService.setComplaintData({
      isAnonymous: this.isAnonymous,
      contactEmail: this.contactEmail,
      deseoCodigoSeguimiento: this.deseoCodigoSeguimiento,
      eCompanyStatus: this.eCompanyStatus,
      eGenre: this.selectedSex  // Guardar el sexo seleccionado
    });

    this.router.navigate(['/evidencia']);
  }

  goBack(route: string) {
    this.router.navigate([route]);  
  }
}