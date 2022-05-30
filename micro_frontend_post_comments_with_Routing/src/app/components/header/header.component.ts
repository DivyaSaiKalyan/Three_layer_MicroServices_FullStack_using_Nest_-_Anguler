import { DataTransferService } from './../../services/data-transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loginMessage = ''; //after completion of dashboard this value should remove
  loginErrorMessage = '';
  loginUserName = '';

  constructor(private dataTransferService: DataTransferService) {}

  ngOnInit(): void {
    this.dataTransferService.currentMessage.subscribe((message: any) => {
      this.loginUserName = message.username;
      this.loginMessage = message.message;
    });
  }

  logout() {
    this.loginMessage = '';
  }
}
