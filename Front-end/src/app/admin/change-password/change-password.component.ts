import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserDataService } from '../../services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { UserService } from '../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatFormFieldModule, MatProgressSpinnerModule, NotifierModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  changePasswordForm: FormGroup;
  submit: boolean = false;

  constructor(private fb: FormBuilder, 
    private notifier: NotifierService,
    private userService: UserService,
    private http: HttpClient,
    private router : Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
     
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.changePasswordForm.valid) {
     
      this.submit = true;
    
       const request = {
          username: sessionStorage.getItem("email"),
          oldPassword: this.changePasswordForm.controls['currentPassword'].value,
          newPassword: this.changePasswordForm.controls['newPassword'].value,
      }

      this.userService.changePassword(request)
        .subscribe(
          (response: any) => {
            this.notifier.notify('success', 'Contraseña cambiada exitosamente');
            this.submit = false;
            if(sessionStorage.getItem("mustChangePassword"))
            {
              sessionStorage.removeItem("mustChangePassword")
              this.router.navigate(['/homeadmin'])
            }
            this.changePasswordForm.reset();
          },
          (error) => {
            this.submit = false;
            console.error('Error en el cambio de contraseña:', error);
            this.notifier.notify('error', 'Contraseña incorrecta');
          }
        );
    }
     
    }
  


}
