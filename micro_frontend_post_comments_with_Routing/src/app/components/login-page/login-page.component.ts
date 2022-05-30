import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginT } from 'src/app/interfaces/login.types';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginErrorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
    ]),
  });

  @Output() onUserLogin: EventEmitter<LoginT> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataTransferService: DataTransferService
  ) {}

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
    this.loginService
      .userLogin(this.loginForm.value)
      .subscribe((message: any) => {
        if (message.message === 'login success') {
          this.router.navigate(['/dashboardPage']);
          this.loginErrorMessage = '';
          this.dataTransferService.changeMessage(message);
        } else {
          this.loginErrorMessage = 'invalid credintails';
        }
      });
    this.loginForm.reset();
  }
}
