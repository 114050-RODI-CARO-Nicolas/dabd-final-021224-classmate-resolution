import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  onSubmit() {
    if (this.form.valid) {
      this.loginService.getUsers().subscribe((users) => {
        users.forEach((user) => {
          if (user.email == this.form.value.usuario && user.password == this.form.value.clave) {
            this.loginService.setUserLogin(user);
            this.router.navigate(["/home"]);
          }
        })
      });
      
    }
  }
  constructor(fb: FormBuilder,private loginService:LoginService,private router:Router) {
    this.form = fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/),
        ],
      ],
    });
  }
}
