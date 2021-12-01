import { Component, OnInit } from '@angular/core';
import { NotificationService } from './utility/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'calculator';

  constructor(private notifyService: NotificationService) {}

  ngOnInit() {}

  // For how-to reference..
  showHtmlToaster(){
    this.notifyService.showHTMLMessage("<h2>Data shown successfully !!</h2>", "Notification")
  }
}
