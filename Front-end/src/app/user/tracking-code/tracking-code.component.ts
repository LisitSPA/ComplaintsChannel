import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { ResponseComplaint } from '../../../types/complaint.type';

@Component({
  selector: 'app-tracking-code',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,],
  templateUrl: './tracking-code.component.html',
  styleUrl: './tracking-code.component.css'
})
export class TrackingCodeComponent {
  trackForm: FormGroup;
  mensajeError: any;
  complaint: any = [];

  constructor(private fb: FormBuilder,
    private route: Router,
    private complaintService: ComplaintService
  ) {
    this.trackForm = this.fb.group({
      trackCode: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  trackingForm = new FormGroup({
    digit1: new FormControl(''),
    digit2: new FormControl(''),
    digit3: new FormControl(''),
    digit4: new FormControl(''),
    digit5: new FormControl('')
  });

  moveFocus(event: any, index: number) {
    const input = event.target.value;
    if (input.length === 1 && index < 4) {
      const nextInput = document.querySelectorAll('input')[index + 1];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }
 
  async onSubmit() {
    let code = `${this.trackingForm.value.digit1}${this.trackingForm.value.digit2}${this.trackingForm.value.digit3}${this.trackingForm.value.digit4}${this.trackingForm.value.digit5}`;
   
    this.mensajeError = ""

    if(code)
      this.complaint = await this.complaintService.getComplaintByCode(code, "es");
     
     if(this.complaint)
        this.route.navigate(['seguimiento/'+code]);
      else
        this.mensajeError = "Código incorrecto" 
   
  }

}
