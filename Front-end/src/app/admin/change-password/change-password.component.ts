import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserDataService } from '../../services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatFormFieldModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{

  mensajeError: any;
  mensajeExito: any;

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private userData: UserDataService,
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
      let data = this.userData.getUserData();
      console.log(data)
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.changePasswordForm.valid) {
     
      let data = this.userData.getUserData();
      console.log(data)
      // const loginCommand = {
      //   username: this.userData.getUserData()
      //   password: this.usuario.password
      // };
  
      this.userService.changePassword(data)
        .subscribe(
          (response: any) => {
            console.log('Login exitoso:', response);
            
            
            
           
          },
          (error) => {
           
          }
        );
    }
     
    }
  


}
