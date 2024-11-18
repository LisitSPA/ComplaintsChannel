import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintDataService } from '../../services/complaint-data.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComplaintService } from '../../services/complaint.service';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';
import { ELanguageType } from '../../../types/language.type';
import { requestStates } from '../../../constants/requestState';

@Component({
  selector: 'app-view-detail-popup',
  standalone: true,
  templateUrl: './viewDetail.component.html',
  styleUrl: './viewDetail.component.css',
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatButtonModule],
 
})
export class ViewDetailPopupComponent implements OnInit {
  code: string | undefined;
  language: string = ELanguageType.español;
  complaint: any = {};


  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  notes: any;

  constructor(
    private complaintService: ComplaintService, 
    private dataService : ComplaintDataService,
  ) {
  }
  
  ngOnInit(): void {
    this.code = this.dataService.getCode();

    if(this.code){
      this.getComplaint()
    }    
  }

  getStateLabel(state: number) {
    return requestStates.find((item) => item.value === state)?.label;
  }

  async getComplaint(){
    this.complaint = await this.complaintService.getComplaintByCode(this.code??"", this.language);
    console.log('--------',this.complaint);
  }
}
