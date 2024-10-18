import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-tracking-code',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './tracking-code.component.html',
  styleUrl: './tracking-code.component.css'
})
export class TrackingCodeComponent {
  trackForm: FormGroup;
  mensajeError: any;
  complaint: any = [];

  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;

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

  onInput(event: Event, inputNumber: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      this.focusNextInput(inputNumber);
    }
  }

  onKeydown(event: KeyboardEvent, inputNumber: number) {
    if (event.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
      this.focusPreviousInput(inputNumber);
    }
  }

  focusNextInput(inputNumber: number) {
    const nextInput = document.querySelectorAll('input')[inputNumber + 1];
      if (nextInput) 
        (nextInput as HTMLInputElement).focus();
  }

  
  focusPreviousInput(inputNumber: number) {
    const nextInput = document.querySelectorAll('input')[inputNumber + 1];
    if (nextInput) 
      (nextInput as HTMLInputElement).focus();
  }

  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData) {
      const otpArray = pastedData.split('').slice(0, 5); // Solo tomar los primeros 5 caracteres si se pega más
      this.fillOtpFields(otpArray);
      event.preventDefault(); // Prevenir que el valor pegado se escriba en el primer input
    }
  }

  fillOtpFields(otpArray: string[]) {
    if (otpArray[0]) this.trackingForm.controls.digit1.setValue(otpArray[0]);
    if (otpArray[1]) this.trackingForm.controls.digit2.setValue(otpArray[1]);
    if (otpArray[2]) this.trackingForm.controls.digit3.setValue(otpArray[2]);
    if (otpArray[3]) this.trackingForm.controls.digit4.setValue(otpArray[3]);
    if (otpArray[4]) this.trackingForm.controls.digit5.setValue(otpArray[4]);
  }

}