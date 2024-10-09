import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  reasons: number[] = [];  
  description: string = '';
  incidentDate: string = '';
  mostrarDropdown: boolean = false;  

  reasonsList = [
    { id: 0, text: 'Violación al Código de Ética' },
    { id: 1, text: 'Fraude Financiero' },
    { id: 2, text: 'Manejo indebido de la Información' },
    { id: 3, text: 'Acoso Laboral' },
    { id: 4, text: 'Abuso de poder' },
    { id: 5, text: 'Uso indebido de recursos de la empresa' },
    { id: 6, text: 'Desviación contable' },
    { id: 7, text: 'Discriminación' },
    { id: 8, text: 'Incumplimiento de Política de Seguridad' },
    { id: 9, text: 'Corrupción o soborno' },
    { id: 10, text: 'Nepotismo' },
    { id: 11, text: 'Violación de la privacidad' },
    { id: 12, text: 'Manipulación de registros' }
  ];

  constructor(private complaintDataService: ComplaintDataService, private router: Router) {}

  toggleReasonSelection(reasonId: number) {
    const index = this.reasons.indexOf(reasonId);
    if (index === -1) {
      this.reasons.push(reasonId);  
    } else {
      this.reasons.splice(index, 1);  
    }
  }

  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
  
    if (this.mostrarDropdown) {
      setTimeout(() => {
        const scrollToElement = document.querySelector('.more-reasons');
        if (scrollToElement) {
          scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); 
    }
  }
  
  guardarYRedirigir() {
    console.log('Datos que se van a guardar:', {
      reasons: this.reasons,
      description: this.description,
      incidentDate: this.incidentDate
    });

    this.complaintDataService.setComplaintData({
      reasons: this.reasons,
      description: this.description,
      incidentDate: this.incidentDate
    });

    this.router.navigate(['/involucrados']);
  }
}
