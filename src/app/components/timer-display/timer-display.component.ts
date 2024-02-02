import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  Subscription,
  map,
  switchMap,
  take,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.scss'],
})
export class TimerDisplayComponent {
  @Input() permissionResult: string = '';
  isAddHour: Boolean = false;
  isSubstractHour: Boolean = false;
  private sumSecondsHour: number = 0;
  subscription = new Subscription();

  constructor(
    private timerService: TimerService,
    private notificationService: NotificationService
  ) {}

  onAddHour() {
    this.timerService.addSeconds(3600);
  }
  onSubstractHour() {
    this.timerService.substractSeconds(3600);
  }

  /*Timer logic*/
  oneSecond = 1000;

  //nowTo$ = this.timerService.seconds$.pipe(shareReplay(1));
  nowTo$ = this.timerService.seconds$;
  countDown$ = this.nowTo$.pipe(
    switchMap((seconds) => timer(0, this.oneSecond).pipe(take(seconds + 1)))
  );

  displayTimeLeft$ = this.countDown$.pipe(
    withLatestFrom(this.nowTo$),
    tap((secondsLeft) => console.log(secondsLeft)),
    map(([countdown, secondsLeft]) => secondsLeft - countdown),
    map((secondsLeft) =>
      this.displayTimeLeft(secondsLeft, this.permissionResult)
    )
  );

  private displayTimeLeft(seconds: number = 0, result: string = '') {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    if (remainderSeconds === 0 && result === 'granted') {
      console.log('fertig');
      this.notificationService.showNotification();
    }
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

    return `Fertig um ${hour}:${minutes < 10 ? '0' : ''}${minutes} Uhr`;
  }
}
