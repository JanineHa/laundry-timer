import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  showNotification() {
    const text = `Die Wäsche ist fertig.`;
    //const img = '/src/assets/icons/icon-128x128.png';
    /*  const notification = new Notification('Ende:', {
      body: text,
      icon: img,
      actions: [
        {
          action: 'yes',
          title: '👍 Yes',
        },
        {
          action: 'no',
          title: '👎 no',
        },
      ],
    }); */
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('Ende:', {
        body: text,
        actions: [
          {
            action: 'yes',
            title: '👍 Yes',
            icon: '',
          },
          {
            action: 'no',
            title: '👎 no',
            icon: '',
          },
        ],
      });
    });
  }
}
