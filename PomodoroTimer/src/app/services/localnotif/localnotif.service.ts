import { Injectable } from '@angular/core';
import { LocalNotifications, PermissionStatus, LocalNotificationSchema, ScheduleResult } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalnotifService {
  notificationsEnabled: boolean = true;
  soundEnabled: boolean = true;

  constructor() {
    this.loadSettings();
  }

  async loadSettings() {
    const notif = await Preferences.get({ key: 'notificationsEnabled' });
    const sound = await Preferences.get({ key: 'soundEnabled' });

    this.notificationsEnabled = notif.value !== 'false';
    this.soundEnabled = sound.value !== 'false';
  }

  async setNotificationsEnabled(value: boolean) {
    this.notificationsEnabled = value;
    await Preferences.set({ key: 'notificationsEnabled', value: String(value) });
  }

  async setSoundEnabled(value: boolean) {
    this.soundEnabled = value;
    await Preferences.set({ key: 'soundEnabled', value: String(value) });
  }

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
    if (!this.notificationsEnabled) return;

    if (!this.soundEnabled) {
      delete notification.sound;
    }

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
      body: 'Your work session has ended!! <3.',
      id: 1,
      schedule: { at: new Date(new Date().getTime() + 500) },
      sound: 'default',
    };
    this.scheduleNotification(notification);
  }

  async sendBreakStartNotification() {
    const notification: LocalNotificationSchema = {
      title: 'Pomodoro Timer',
      body: 'Your break has started! Rest up girlypop <3.',
      id: 2,
      schedule: { at: new Date(new Date().getTime() + 500) },
      sound: 'default',
    };
    this.scheduleNotification(notification);
  }

  async sendBreakEndNotification() {
    const notification: LocalNotificationSchema = {
      title: 'Pomodoro Timer',
      body: 'Your break is over! Grindset Tym </3.',
      id: 3,
      schedule: { at: new Date(new Date().getTime() + 500) },
      sound: 'default',
    };
    this.scheduleNotification(notification);
  }
}
