import { Component } from '@angular/core';
import { LocalnotifService } from '../services/localnotif/localnotif.service'
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private localnotifService: LocalnotifService ) {}

  timeLeft: number = 1500; 
  interval: any;
  timerRunning: boolean = false;

  ngOnInit() {
    App.addListener('backButton', () => {
      App.exitApp();
    });
  
    LocalNotifications.requestPermissions().then(result => {
      if (result.display === 'granted') {
        console.log('Permission granted');
      } 
      
      else {
        console.warn('Permission denied');
      }
    });
  }

  startTimer() {
    if (this.timerRunning) return; 
    this.timerRunning = true;

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } 
      
      else if (this.timeLeft === 0) {
        clearInterval(this.interval);
        this.localnotifService.sendWorkSessionEndNotification(); 
        this.startBreak(); 
      }
    }, 1000);
  }

  startBreak() {
    this.timeLeft = 300; 
    this.localnotifService.sendBreakStartNotification(); 
  
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } 
      
      else {
        clearInterval(this.interval); 
        this.localnotifService.sendBreakEndNotification(); 
        
        this.timeLeft = 1500;
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
