import { LoginT } from './../interfaces/login.types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterT } from '../interfaces/registration.types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  userLogin(logindata: LoginT): Observable<LoginT> {
    const loginUrl = 'http://localhost:3000/register-login/loginUser';
    return this.http.post<LoginT>(loginUrl, logindata);
  }

  newRegistration(registerdata: RegisterT): Observable<RegisterT> {
    const registerUrl = 'http://localhost:3000/register-login/createUser';
    return this.http.post<RegisterT>(registerUrl, registerdata);
  }
}
