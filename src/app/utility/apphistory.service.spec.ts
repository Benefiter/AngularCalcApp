import { TestBed } from '@angular/core/testing';

import { ApphistoryService } from './apphistory.service';

describe('ApphistoryService', () => {
  let service: ApphistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApphistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
