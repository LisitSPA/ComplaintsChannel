import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-involucrados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './involucrados.component.html',
  styleUrls: ['./involucrados.component.css']
})
export class InvolucradosComponent {
  personasSeleccionadas: string[] = [];
  personDescription: string = '';
  manualName: string = '';  
  manualLastName: string = '';  

  constructor(private complaintDataService: ComplaintDataService, private router: Router) {}

  actualizarSeleccion(persona: string, event: Event) {
    const checkbox = (event.target as HTMLInputElement);
    if (checkbox.checked) {
      this.personasSeleccionadas.push(persona);
    } else {
      this.personasSeleccionadas = this.personasSeleccionadas.filter(p => p !== persona);
    }
  }

  guardarCausal() {
    if (this.manualName && this.manualLastName) {
      const newCausal = `${this.manualName} ${this.manualLastName}`;
      this.personasSeleccionadas.push(newCausal);

      this.manualName = '';
      this.manualLastName = '';

      console.log('Causal agregado manualmente:', newCausal);  
    } else {
      console.log('Debe ingresar un nombre y apellido');
    }
  }

  guardarDatosYRedirigir(event: Event) {
    event.preventDefault();  

    const personInvolveds = this.personasSeleccionadas.map(persona => ({
      names: persona.split(' ')[0],  
      lastName: persona.split(' ')[1] || '',  
      personDescription: this.personDescription
    }));

    this.complaintDataService.setComplaintData({
      personInvolveds: personInvolveds
    });

    console.log('Datos guardados de personas involucradas:', personInvolveds);

    this.router.navigate(['/denunciante']);
  }
}
