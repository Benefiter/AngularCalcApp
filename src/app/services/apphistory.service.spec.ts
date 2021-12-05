import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { storeMock } from '../testing/stubs';

import { ApphistoryService } from './apphistory.service';

describe('ApphistoryService', () => {
  let service: ApphistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeMock },
      ],
    });
    service = TestBed.inject(ApphistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
