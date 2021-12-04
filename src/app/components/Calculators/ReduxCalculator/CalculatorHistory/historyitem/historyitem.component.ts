import { Component, Input, OnInit } from '@angular/core';
import { IResultHistoryCacheItem } from 'src/app/redux/calculator.state.model';
import { ApphistoryService } from './../../../../../utility/apphistory.service';

@Component({
  selector: 'app-historyitem',
  templateUrl: './historyitem.component.html',
  styleUrls: ['./historyitem.component.css'],
})
export class HistoryitemComponent implements OnInit {
  @Input() id: string;
  @Input() margin: string = '1px';
  text: string;
  history: IResultHistoryCacheItem | undefined;

  constructor(private appHistoryService: ApphistoryService) {
    this.text = 'id unknown';
    this.id = '';
  }
  ngOnInit(): void {
    this.history = this.appHistoryService.getItem(this.id);
    this.text = this.setText();
  }

  setText = () => {
    return this.appHistoryService.getSummary(this.id);
  }
}
