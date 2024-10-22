import { Component, EventEmitter ,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintDataService } from '../../services/complaint-data.service';


@Component({
  selector: 'app-misdatos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './misdatos.component.html',
  styleUrl: './misdatos.component.css'
})
export class MisdatosComponent {
  nombre: string = '';
  estado: string = '';
  cargo: string = '';
  area: string = '';
  sexo: string = ''; 
  contacto: string = '';
  rut: string = '';
  eCompanyStatus: number = 1;  

  @Output() cerrar = new EventEmitter<void>();

  constructor(private complaintDataService: ComplaintDataService) {}

  guardarDatos() {
    this.complaintDataService.setDenunciante({
      complainant: {
        names: this.nombre,
        eCompanyStatus: this.eCompanyStatus,  
        position: this.cargo,
        area: this.area,
        eGenre: this.sexo === 'Masculino' ? 2 : 1,  
        contactPhone: this.contacto,
        rut: this.rut
      }
    });

    console.log('Datos del denunciante guardados:', {
      names: this.nombre,
      position: this.cargo,
      area: this.area,
      eCompanyStatus: this.eCompanyStatus,
      contactPhone: this.contacto,
      rut: this.rut,
      eGenre: this.sexo,
    });

    this.cerrar.emit();  
  }
}
