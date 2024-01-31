import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  showNotification() {
    const text = `Die Waschemaschine ist fertig.`;
    const notification = new Notification('Ende:', { body: text });
  }
}
