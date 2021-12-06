import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations';
import { ActiveToast } from 'ngx-toastr';
import { ApphistoryService } from './services/apphistory.service';

const CalculatorSwithNotifyTimeout = 1000;
const bullet1 = 'Add samples to the chart by generating calculator results. The "Cache Trend Data icon will appear on the chart.';
const bullet2 = 'Use the "Cache Trend Data" icon on the chart to create a snapshot of the current trend.';
const bullet3 = 'Drag and drop one or more of the cached items from the Calculator History card to the chart';
const usage = `<ul><li>${bullet1}</li>&nbsp<li>${bullet2}</li>&nbsp<li>${bullet3}</li></ul>`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader],
})
export class AppComponent implements OnInit {
  title = 'Event Calculator Active';
  home: boolean = true;
  opened: boolean = true;
  helpIdToast: ActiveToast<any> | undefined = undefined;
  useHelpIdToast: ActiveToast<any> | undefined = undefined;

  constructor(
    private notifyService: NotificationService,
    private appHIstoryService: ApphistoryService,
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
        this.title = this.home ? 'Event Calculator' : 'Redux Calculator';
        if (!this.home && this.appHIstoryService.getCount() == 0) this.instructionsNotify();
      });
  }

  ngOnDestroy() {
    this.helpIdToast?.toastRef.close();
    this.useHelpIdToast?.toastRef.close();
  }

  instructionsNotify = () => {
      this.useHelpIdToast = this.notifyService.showInfoWithTimeout(
        '',
        `Click Help on the navigation menu.`,
        3000
      );
  };

  showHelp() {
    this.useHelpIdToast?.toastRef.close();
    this.helpIdToast = this.notifyService?.showHTMLMessage(usage, `Usage:`);
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  toggleSidenav = () => (this.opened = !this.opened);
}
