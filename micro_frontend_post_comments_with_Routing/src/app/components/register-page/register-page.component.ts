import { RegisterT } from './../../interfaces/registration.types';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registrationForm = this.fb.group(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobilenumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      reenterpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    },
    { validator: this.checkPassword('password', 'reenterpassword') }
  );

  @Output() onSubmitNewRegistration: EventEmitter<RegisterT> =
    new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }

  get mobilenumber() {
    return this.registrationForm.get('mobilenumber');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get reenterpassword() {
    return this.registrationForm.get('reenterpassword');
  }

  button() {
    return this.registrationForm.invalid;
  }

  onSubmitRegForm() {
    this.loginService
      .newRegistration(this.registrationForm.value)
      .subscribe((data) => {
        alert(data.email + ' succsfully register');
        this.router.navigate(['/loginPage']);
      });
    this.registrationForm.reset();
  }

  checkPassword(controlName: string, machingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const machControl = formGroup.controls[machingControlName];
      if (control.value !== machControl.value) {
        machControl.setErrors({ confirmPasswordMatch: true });
      } else {
        machControl.setErrors(null);
      }
    };
  }
}
