import { TestBed } from '@angular/core/testing';

import { LocalnotifService } from './localnotif.service';

describe('LocalnotifService', () => {
  let service: LocalnotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalnotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
