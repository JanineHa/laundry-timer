import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private secondsSubject = new BehaviorSubject<number>(0);
  seconds$ = this.secondsSubject.asObservable();

  updateSeconds(seconds: number) {
    this.secondsSubject.next(seconds); //updates the numbers
  }

  addSeconds(seconds: number) {
    this.secondsSubject.next(this.secondsSubject.value + seconds);
  }

  substractSeconds(seconds: number) {
    if (this.secondsSubject.value >= 3600) {
      this.secondsSubject.next(this.secondsSubject.value - seconds);
    } else return;
  }

  constructor() {}
}
