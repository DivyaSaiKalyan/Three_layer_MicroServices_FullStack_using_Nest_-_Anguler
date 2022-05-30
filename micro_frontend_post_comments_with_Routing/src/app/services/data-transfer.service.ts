import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private messageSorce = new BehaviorSubject<string>('');
  currentMessage = this.messageSorce.asObservable();
  loginUser!: string;

  constructor() {}

  changeMessage(message: any) {
    this.messageSorce.next(message);
  }
}
