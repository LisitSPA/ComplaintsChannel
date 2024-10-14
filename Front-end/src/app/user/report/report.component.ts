import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, MatGridListModule, MatButtonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reasons: number[] = [];  
  description: string = '';
  incidentDate: string = '';
  mostrarDropdown: boolean = false;  

  reasonsList : any = [
  ];

  constructor(
    private complaintDataService: ComplaintDataService, 
    private complaintService: ComplaintService, 
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
