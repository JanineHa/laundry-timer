import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'laundry-timer';
  ngOnInit() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      Notification.requestPermission().then((result) => {
        console.log(result);
        if (result === 'granted') {
          this.createNotification();
        }
      });
    }
  }

  createNotification() {
    const img = '/src/assets/icons/icon-128x128.png';
    const text = `Die Waschemaschine ist fertig.`;
    const notification = new Notification('Ende:', { body: text, icon: img });
  }
}
