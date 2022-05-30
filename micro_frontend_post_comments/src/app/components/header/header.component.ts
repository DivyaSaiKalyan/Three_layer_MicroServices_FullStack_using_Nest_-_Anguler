import { RegisterT } from './../../interfaces/registration.types';
import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { LoginT } from './../../interfaces/login.types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loginRegistration = false;
  loginMessage = ''; //after completion of dashboard this value should remove
  loginErrorMessage = '';
  loginUserName = '';

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {}

  onToggleLogin() {
    this.loginRegistration = true;
  }

  onToggleRegister() {
    this.loginRegistration = false;
  }

  async loginData(loginData: LoginT) {
    this.loginService.userLogin(loginData).subscribe((message: any) => {
      if (message.message === 'login success') {
        this.loginMessage = message.message;
        this.loginErrorMessage = '';
        this.loginUserName = message.username;
      } else {
        this.loginErrorMessage = 'invalid credintails';
        this.loginMessage = '';
      }
    });
  }

  newReg(newRegData: RegisterT) {
    this.loginService
      .newRegistration(newRegData)
      .subscribe((data) => alert(data.email + ' succsfully register'));
    this.loginRegistration = true;
  }

  logoutButton() {
    //  this.loginRegistration = !this.loginRegistration;
    console.log('logout');
  }
}
