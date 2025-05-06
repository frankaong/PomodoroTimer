import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TimerSettingsService {
  private focusLength = 1500; 
  private breakLength = 300; 

  constructor() {
    this.loadSettings();
  }

  async loadSettings() {
    const focus = await Preferences.get({ key: 'focusLength' });
    const breakTime = await Preferences.get({ key: 'breakLength' });

    if (focus.value) this.focusLength = +focus.value;
    if (breakTime.value) this.breakLength = +breakTime.value;
  }

  getFocusLength(): number {
    return this.focusLength;
  }

  getBreakLength(): number {
    return this.breakLength;
  }

  async setFocusLength(seconds: number) {
    this.focusLength = seconds;
    await Preferences.set({ key: 'focusLength', value: String(seconds) });
  }

  async setBreakLength(seconds: number) {
    this.breakLength = seconds;
    await Preferences.set({ key: 'breakLength', value: String(seconds) });
  }
}
