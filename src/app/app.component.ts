import { Component, OnInit } from '@angular/core';
import { NotificationService } from './utility/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentRoute: string = 'home'
  title = 'Event Calculator Active';
  home: boolean = true;

  constructor(private notifyService: NotificationService) {}

  ngOnInit() {}

  // For how-to reference..
  showHtmlToaster(){
    this.notifyService?.showHTMLMessage("<h2>Data shown successfully !!</h2>", "Notification")
  }

  setCurrentRoute = (currentRoute: string) => {
    this.currentRoute = currentRoute
    this.title = currentRoute == '/' ? "Event Calculator is Active" : "Redux Calculator is Active";
    this.home = currentRoute == '/';
    this.home ? this.notifyService.showInfoWithTimeout('Switched to Event Calculator', '', 3000) : this.notifyService.showInfoWithTimeout('Switched to Redux Calculator', '', 3000);
  }
}
