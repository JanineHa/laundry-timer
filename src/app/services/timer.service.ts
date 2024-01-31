import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  //private secondsSubject = new BehaviorSubject(0);
  private secondsSubject = new Subject<number>();
  seconds$ = this.secondsSubject.asObservable();

  updateSeconds(seconds: number) {
    this.secondsSubject.next(seconds); //updates the numbers
  }

  constructor() {}
}
