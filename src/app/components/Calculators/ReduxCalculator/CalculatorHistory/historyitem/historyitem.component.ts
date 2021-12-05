import { Component, Input, OnInit } from '@angular/core';
import { ApphistoryService } from './../../../../../utility/apphistory.service';
import { DndService } from '@ng-dnd/core';

@Component({
  selector: 'app-historyitem',
  templateUrl: './historyitem.component.html',
  styleUrls: ['./historyitem.component.css'],
})
export class HistoryitemComponent implements OnInit {
  @Input() id: string;
  @Input() margin: string = '1px';
  text: string;
  source = this.dnd.dragSource<{ id: string }>('historyItem', {
    beginDrag: () => ({ id: this.id }),
  });
  isDragging: boolean = false;

  constructor(
    private appHistoryService: ApphistoryService,
    private dnd: DndService
  ) {
    this.text = 'id unknown';
    this.id = '';
  }
  ngOnInit(): void {
    this.text = this.setText();
    this.source
      ?.listen((monitor) => monitor.isDragging())
      .subscribe((val) => (this.isDragging = val));
  }

  ngOnDestroy() {
    this.source?.unsubscribe();
  }

  setText = () => {
    return this.appHistoryService.getSummary(this.id);
  };
}
