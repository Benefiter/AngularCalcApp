import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', [
      'showSuccess',
      'showHTMLMessage',
      'showSuccessWithTimeout',
      'showInfoWithTimeout',
    ]);
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {provide: ToastrService, useValue: spy}
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// beforeEach(() => {
//   testQuote = 'Test Quote';

//   // Create a fake TwainService object with a `getQuote()` spy
//   const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
//   // Make the spy return a synchronous Observable with the test data
//   getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

//   TestBed.configureTestingModule({
//     declarations: [TwainComponent],
//     providers: [{provide: TwainService, useValue: twainService}]
//   });

//   fixture = TestBed.createComponent(TwainComponent);
//   component = fixture.componentInstance;
//   quoteEl = fixture.nativeElement.querySelector('.twain');
// });
