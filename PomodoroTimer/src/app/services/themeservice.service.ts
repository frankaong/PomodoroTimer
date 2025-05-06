import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeserviceService {
  private DARK_MODE_KEY = 'darkMode';

  constructor() {
    this.loadTheme();
  }


  async loadTheme() {
    const { value } = await Preferences.get({ key: this.DARK_MODE_KEY });
    const isDark = value === 'true';
    this.setDarkMode(isDark);  
  }

  async setDarkMode(enabled: boolean) {
    console.log('Setting dark mode. Enabled:', enabled); 
    document.body.classList.toggle('dark', enabled);
    await Preferences.set({ key: this.DARK_MODE_KEY, value: String(enabled) });
  }
  

  async isDarkModeEnabled(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.DARK_MODE_KEY });
    return value === 'true';
  }
}
