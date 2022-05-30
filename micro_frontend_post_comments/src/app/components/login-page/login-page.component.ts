import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginT } from 'src/app/interfaces/login.types';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
    ]),
  });

  @Output() onUserLogin: EventEmitter<LoginT> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  button() {
    return this.loginForm.invalid;
  }

  onSubmitLogin() {
    this.onUserLogin.emit(this.loginForm.value);
    this.loginForm.reset();
  }
}
