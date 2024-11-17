import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, MatGridListModule, MatButtonModule, NotifierModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reasons: number[] = [];  
  description: string = '';
  incidentDate: string | undefined;
  mostrarDropdown: boolean = false; 
   
  private complaint: any = {
    reasons: [],
    isAnonymous: true,
    description: '',
    incidentDate: '',
    personInvolveds: [],   
    contactEmail: ''
  };


  reasonsList : any = [
  ];

  constructor(
    private complaintDataService: ComplaintDataService, 
    private complaintService: ComplaintService,
    private notifier: NotifierService,
    private router: Router,
  ) {
   
  }

  ngOnInit(): void { 
    this.getData()
  }

  async getData(){
    this.reasonsList = this.complaintDataService.getReasons()
    if(!this.reasonsList.length)
      {
        this.reasonsList = await this.complaintService.getReasonsComplaints();
        this.complaintDataService.setReasons(this.reasonsList);
      }
    
    this.complaint = this.complaintDataService.getComplaintData();
    if(this.complaint)
    {
      this.reasons = [...this.complaint.reasons];
      this.description = this.complaint.description;
      this.incidentDate = this.complaint.incidentDate;
    }
  }

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
  
  saveAndNext() {
    if (!this.reasons.length) {
      this.notifier.notify('error', 'Por favor selecciona al menos un motivo');
      return;
    }

    if (!this.description) {
      this.notifier.notify('error', 'Por favor ingresa una descripción');
      return;
    }

    if (!this.incidentDate) {
      this.notifier.notify('error', 'Por favor ingresa una fecha');
      return;
    }

    this.complaintDataService.setComplaintData({
      reasons: this.reasons,
      description: this.description,
      incidentDate: this.incidentDate
    });

    this.router.navigate(['/involucrados']);
  }
}
