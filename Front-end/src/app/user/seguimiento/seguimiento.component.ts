import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { ELanguageType } from '../../../types/language.type';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent {

  constructor(
    private route: ActivatedRoute,
    private complaintService: ComplaintService
  ) {
   
  }

  code: string | undefined;
  language: string = ELanguageType.español;
  complaint: any = [];
  complainant: any = [];
  filesUrl: string = "";

  ngOnInit(): void {
    // Capturando el parámetro de la URL
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code')??"";     
    });

    if(this.code){
      this.getComplaint()
    }
    this.filesUrl = environment.filesUrl;
    
  }

  async getComplaint(){
    this.complaint = await this.complaintService.getComplaintByCode(this.code??"", this.language);
    this.complainant = this.complaint?.complainant
    console.log(this.complaint);
  }

}
