import { Component, OnInit } from '@angular/core';
import { LocalnotifService } from '../services/localnotif/localnotif.service';
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';
import { TimerSettingsService } from '../services/timer-settings.service';
import { ThemeserviceService } from '../services/themeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  timeLeft: number = 0;
  interval: any;
  timerRunning: boolean = false;
  timerState: string = 'Focus Diva!';

  constructor(
    private themeService: ThemeserviceService,
    private localnotifService: LocalnotifService,
    private timerSettings: TimerSettingsService
  ) {}

  async ngOnInit() {
    App.addListener('backButton', () => {
      App.exitApp();
    });

    LocalNotifications.requestPermissions().then(result => {
      if (result.display === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.warn('Notification permission denied');
      }
    });
  }

  async ionViewWillEnter() {
    await this.themeService.loadTheme();
    await this.timerSettings.loadSettings(); 
    this.timeLeft = this.timerSettings.getFocusLength();
    this.timerState = 'Focus Diva!';
  }

  startTimer() {
    if (this.timerRunning) return;
    clearInterval(this.interval);
    this.timerRunning = true;

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        clearInterval(this.interval);
        this.localnotifService.sendWorkSessionEndNotification();
        this.startBreak();
      }
    }, 1000);
  }

  startBreak() {
    this.timerState = 'Break <3';
    this.timeLeft = this.timerSettings.getBreakLength();
    this.localnotifService.sendBreakStartNotification();

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.localnotifService.sendBreakEndNotification();

        this.timeLeft = this.timerSettings.getFocusLength();
        this.timerRunning = false;
      }
    }, 1000);
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
  }

  padTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
