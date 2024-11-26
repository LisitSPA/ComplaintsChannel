import { Component, EventEmitter ,Input,OnInit,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { NotifierService } from 'gramli-angular-notifier';
import genreTypes from '../../../types/genreTypes';


@Component({
  selector: 'app-misdatos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './misdatos.component.html',
  styleUrl: './misdatos.component.css'
})
export class MisdatosComponent implements OnInit {
  nombre: string = '';
  estado: string = '';
  cargo: string = '';
  area: string = '';
  sexo: string = ''; 
  contacto: string = '';
  rut: string = '';
  eCompanyStatus: number = 1;
  currentComplaint: any = {};
  genreTypeValues = genreTypes;


  @Input() cerrar!: Function;

  constructor(private complaintDataService: ComplaintDataService, private notifier: NotifierService) {}

  ngOnInit(): void {
    const temp = this.complaintDataService.getDenunciante();
    this.currentComplaint = temp?.complainant;

    this.nombre = this.currentComplaint?.names || '';
    this.estado = this.currentComplaint?.eCompanyStatus || '';
    this.cargo = this.currentComplaint?.position || '';
    this.area = this.currentComplaint?.area || '';
    this.sexo =  this.currentComplaint?.eGenre || 0;
    this.contacto = this.currentComplaint?.contactPhone || '';
    this.rut = this.currentComplaint?.rut || '';
  }

  guardarDatos() {
    if (!this.nombre || !this.cargo || !this.area || !this.sexo || !this.contacto || !this.rut || !this.eCompanyStatus) {
      this.notifier.notify('error', 'Por favor completa todos los campos');
      return;
    }

    this.complaintDataService.setDenunciante({
      complainant: {
        names: this.nombre,
        eCompanyStatus: this.eCompanyStatus,  
        position: this.cargo,
        area: this.area,
        eGenre: this.sexo,
        contactPhone: this.contacto.toString(),
        rut: this.rut
      }
    });

    this.cerrar(false);  
  }

  cancelar() {
    this.cerrar(!this.currentComplaint?.names);
  }
}
