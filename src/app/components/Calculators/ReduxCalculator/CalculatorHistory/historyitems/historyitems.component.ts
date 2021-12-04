import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, IResultHistoryCacheItem } from 'src/app/redux/calculator.state.model';

@Component({
  selector: 'app-historyitems',
  templateUrl: './historyitems.component.html',
  styleUrls: ['./historyitems.component.css'],
})
export class HistoryitemsComponent implements OnInit {
  hidden: boolean = true;
  historyCache: IResultHistoryCacheItem[] = [];

  constructor(private store: Store<IAppStore>) {}
  ngOnInit(): void {
    this.store?.select('calculatorState')?.subscribe((state) => {
      const { resultHistoryCache } = state;
      this.historyCache = resultHistoryCache;
      this.hidden = resultHistoryCache.length == 0;
    });
  }
}
