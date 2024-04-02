import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { Login, User } from '../../models/Users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, InputComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.validatePassword
      ])
    })
  }

  ngOnInit(): void { 
  }
  
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
  }

  get formControls() { return this.loginForm.controls; }

  
  validatePassword(control:any) {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNonAlphaNumeric = /[^A-Za-z0-9]/.test(password);
    const valid = hasNumber && hasUpper && hasLower && hasNonAlphaNumeric;
    if (!valid) {
      return {
        invalidPassword: true
      };
    }
    return null;
  }


}
