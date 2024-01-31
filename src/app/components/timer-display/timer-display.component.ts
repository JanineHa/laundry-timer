import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Subscription,
  combineLatest,
  fromEvent,
  map,
  merge,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.scss'],
})
export class TimerDisplayComponent {
  constructor(private timerService: TimerService) {}
  subscription = new Subscription();

  @ViewChild('hourPlus', { static: true, read: ElementRef })
  hourPlus!: ElementRef<HTMLButtonElement>;
  @ViewChild('hourMinus', { static: true, read: ElementRef })
  hourMinus!: ElementRef<HTMLButtonElement>;

  createButtonObservable(nativeElement: HTMLButtonElement, seconds: number) {
    return fromEvent(nativeElement, 'click').pipe(map(() => seconds));
  }
  ngOnInit(): void {
    const hourPlus$ = this.createButtonObservable(
      this.hourPlus.nativeElement,
      3600
    );
    const hourMinus$ = this.createButtonObservable(
      this.hourMinus.nativeElement,
      3600
    );
  }

  onAddHour(): void {
    console.log('clicked');

    /*  this.subscription.add(
      combineLatest(hourPlus$, this.displayTimeLeft$).subscribe(([seconds]) => {
        this.timerService.updateSeconds(seconds); //updates view of timer
        console.log(`${seconds} seconds`);
      })
    ); */
  }
  onSubstractHour() {}
  /*Timer logic*/
  oneSecond = 1000;
  nowTo$ = this.timerService.seconds$.pipe(shareReplay(1));

  countDown$ = this.nowTo$.pipe(
    switchMap((seconds) => timer(0, this.oneSecond).pipe(take(seconds + 1)))
  );
  displayTimeLeft$ = this.countDown$.pipe(
    withLatestFrom(this.nowTo$),
    tap((secondsLeft) => console.log(secondsLeft)),
    map(([countdown, secondsLeft]) => secondsLeft - countdown),
    map((secondsLeft) => this.displayTimeLeft(secondsLeft))
  );

  private displayTimeLeft(seconds: number = 0) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  }
  displayEndTime$ = this.nowTo$.pipe(
    map((seconds) => this.displayEndTime(Date.now(), seconds))
  );

  private displayEndTime(now: number, seconds: number): string {
    const timestamp = now + seconds * this.oneSecond;
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    if (minutes === 0) {
      return `Starte den Timer `;
    } else {
      return `Fertig um ${hour}:${minutes < 10 ? '0' : ''}${minutes} Uhr`;
    }
  }
}
