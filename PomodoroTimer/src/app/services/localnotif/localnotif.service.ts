import { Injectable } from '@angular/core';
import { LocalNotifications, PermissionStatus, LocalNotificationSchema, ScheduleResult } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class LocalnotifService {

  constructor() { }

  async checkNotificationPermissions(): Promise<PermissionStatus> {
    const permissions = await LocalNotifications.checkPermissions();
    console.log('Current permissions:', permissions);
    return permissions;
  }

  
  async requestNotificationPermissions(): Promise<PermissionStatus> {
    const permissions = await LocalNotifications.requestPermissions();
    console.log('Updated permissions:', permissions);
    return permissions;
  }

  
  async scheduleNotification(notification: LocalNotificationSchema) {
    await LocalNotifications.schedule({
      notifications: [notification],
    });
    console.log('Notification scheduled:', notification);
  }

  async getPendingNotifications(): Promise<ScheduleResult> {
    const pending = await LocalNotifications.getPending();
    console.log('Pending notifications:', pending);
    return pending;
  }

  
  async cancelNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
    console.log(`Notification with ID ${id} canceled.`);
  }

  
  async sendWorkSessionEndNotification() {
    const notification: LocalNotificationSchema = {
      title: 'Pomodoro Timer',
      body: 'Your work session has ended! Take a 5-minute break.',
      id: 1,
      schedule: { at: new Date(new Date().getTime() + 500) }, 
      sound: 'default',  
    };
    this.scheduleNotification(notification);
  }

  
  async sendBreakStartNotification() {
    const notification: LocalNotificationSchema = {
      title: 'Pomodoro Timer',
      body: 'Your break has started! Relax for 5 minutes.',
      id: 2,
      schedule: { at: new Date(new Date().getTime() + 500) }, 
      sound: 'default',  
    };
    this.scheduleNotification(notification);
  }

  
  async sendBreakEndNotification() {
    const notification: LocalNotificationSchema = {
      title: 'Pomodoro Timer',
      body: 'Your break is over! Time to get back to work.',
      id: 3,
      schedule: { at: new Date(new Date().getTime() + 500) }, 
      sound: 'default',  
    };
    this.scheduleNotification(notification);
  }
}