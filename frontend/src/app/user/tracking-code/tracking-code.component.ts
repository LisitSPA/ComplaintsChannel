import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracking-code',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,],
  templateUrl: './tracking-code.component.html',
  styleUrl: './tracking-code.component.css'
})
export class TrackingCodeComponent {
  trackForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  onSubmit() {
    if (this.trackForm.valid) {
      console.log('Código enviado:', this.trackForm.value.trackCode);
    }
  }

}
