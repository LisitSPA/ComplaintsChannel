import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Involved } from '../../../types/complaint.type';

@Component({
  selector: 'app-involucrados',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './involucrados.component.html',
  styleUrls: ['./involucrados.component.css']
})
export class InvolucradosComponent {

  personasSeleccionadas: string[] = [];
  personDescription: string = '';
  manualName: string = '';  
  complaint: any;

  constructor(private complaintDataService: ComplaintDataService, 
    private router: Router,
    private location: Location
  ) {

    this.complaint = this.complaintDataService.getComplaintData();
    if(this.complaint)
    {
     
      this.personasSeleccionadas = this.complaint.personInvolveds.map((persona: any) => (
          persona.names 
      ));
      this.personDescription = this.complaint.personInvolveds[0]?.personDescription;
      console.log(this.personasSeleccionadas)
    }
  }

  actualizarSeleccion(persona: string, event: Event) {
    const checkbox = (event.target as HTMLInputElement);
    if (checkbox.checked) {
      this.personasSeleccionadas.push(persona);
    } else {
      this.personasSeleccionadas = this.personasSeleccionadas.filter(p => p !== persona);
    }
  }

  guardarCausal() {
    if (this.manualName) {
      const newCausal = `${this.manualName}`;
      this.personasSeleccionadas.push(newCausal);

      this.manualName = '';

      console.log('Causal agregado manualmente:', newCausal);  
    } else {
      console.log('Debe ingresar un nombre y apellido');
    }
  }

  guardarDatosYRedirigir(event: Event) {
    event.preventDefault();  

    const personInvolveds = this.personasSeleccionadas.map(persona => ({
      names: persona.split(' ')[0],   
      personDescription: this.personDescription
    }));

    this.complaintDataService.setComplaintData({
      personInvolveds: personInvolveds
    });

    console.log('Datos guardados de personas involucradas:', personInvolveds);

    this.router.navigate(['/denunciante']);
  }

  goBack() {
    this.router.navigate(['/report']);
  }
    
}
