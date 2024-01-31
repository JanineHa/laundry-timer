import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'laundry-timer';
  permissionResult: string = '';
  ngOnInit() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      Notification.requestPermission().then((result) => {
        console.log(result);
        this.permissionResult = result;
        if (result === 'granted') {
          console.log('Berechtigung erteilt');
        }
      });
    }
  }
}
