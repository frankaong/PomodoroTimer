import { TestBed } from '@angular/core/testing';

import { TimerSettingsService } from './timer-settings.service';

describe('TimerSettingsService', () => {
  let service: TimerSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
