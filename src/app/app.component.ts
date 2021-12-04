import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationService } from './utility/notification.service';

const CalculatorSwithNotifyTimeout = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Event Calculator Active';
  home: boolean = true;

  constructor(
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((_) => {
        this.home = !this.router.url.includes('redux');
        this.home
          ? this.notifyService.showInfoWithTimeout(
              'Switched to Event Calculator',
              '',
              CalculatorSwithNotifyTimeout
            )
          : this.notifyService.showInfoWithTimeout(
              'Switched to Redux Calculator',
              '',
              CalculatorSwithNotifyTimeout
            );
      });
  }

  // For how-to reference.
  showHtmlToaster() {
    this.notifyService?.showHTMLMessage(
      '<h2>Data shown successfully !!</h2>',
      'Notification'
    );
  }
}
