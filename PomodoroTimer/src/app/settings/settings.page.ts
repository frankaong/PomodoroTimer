import { Component, OnInit } from '@angular/core';
import { TimerSettingsService } from '../services/timer-settings.service';
import { LocalnotifService } from '../services/localnotif/localnotif.service';
import { ThemeserviceService } from '../services/themeservice.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  focusLength!: number;
  breakLength!: number;
  notificationsEnabled: boolean = true;

  constructor(
    private themeService: ThemeserviceService,
    private timerSettings: TimerSettingsService,
    private notifService: LocalnotifService
  ) {}

  async ngOnInit() {
    await this.notifService.loadSettings();
    this.notificationsEnabled = this.notifService.notificationsEnabled;
    this.focusLength = this.timerSettings.getFocusLength() / 60;
    this.breakLength = this.timerSettings.getBreakLength() / 60;
  }

  updateFocusLength() {
    this.timerSettings.setFocusLength(this.focusLength * 60);
  }

  updateBreakLength() {
    this.timerSettings.setBreakLength(this.breakLength * 60);
  }

  toggleNotifications() {
    this.notifService.setNotificationsEnabled(this.notificationsEnabled);
  }


  
}
