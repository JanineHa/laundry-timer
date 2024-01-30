import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, filter, fromEvent, map, merge, tap } from 'rxjs';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.scss'],
})
export class SelectBarComponent {
  constructor(private timerService: TimerService) {}
  inputMinutes: string = '';
  subscription = new Subscription();

  @ViewChild('timerK1', { static: true, read: ElementRef })
  timerK1!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerK2', { static: true, read: ElementRef })
  timerK2!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerK3', { static: true, read: ElementRef })
  timerK3!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerK4', { static: true, read: ElementRef })
  timerK4!: ElementRef<HTMLButtonElement>;
  @ViewChild('myForm', { static: true, read: ElementRef })
  myForm!: ElementRef<HTMLFormElement>;

  createButtonObservable(nativeElement: HTMLButtonElement, seconds: number) {
    return fromEvent(nativeElement, 'click').pipe(map(() => seconds));
  }
  ngOnInit(): void {
    const timerK1$ = this.createButtonObservable(
      this.timerK1.nativeElement,
      20
    );
    const timerK2$ = this.createButtonObservable(
      this.timerK2.nativeElement,
      30
    );
    const timerK3$ = this.createButtonObservable(
      this.timerK1.nativeElement,
      40
    );
    const timerK4$ = this.createButtonObservable(
      this.timerK2.nativeElement,
      50
    );

    const myForm$ = fromEvent(this.myForm.nativeElement, 'submit').pipe(
      filter(() => !!this.inputMinutes),
      map(() => parseFloat(this.inputMinutes)),
      map((inputMinutes) => Math.floor(inputMinutes * 60)),
      tap(() => this.myForm.nativeElement.reset())
    );

    this.subscription.add(
      merge(timerK1$, timerK2$, timerK3$, timerK4$, myForm$).subscribe(
        (seconds) => {
          this.timerService.updateSeconds(seconds); //updates view of timer
          console.log(`${seconds} seconds`);
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
