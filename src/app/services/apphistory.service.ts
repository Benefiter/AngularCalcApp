import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IAppStore,
  IResultHistoryCacheItem,
} from 'src/app/redux/calculator.state.model';
import { cloneDeep } from 'lodash';
import { clearResultsHistoryCache } from '../redux/calculator.actions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApphistoryService {
  resultHistory: IResultHistoryCacheItem[] = [];
  hasCachedHistory: boolean = false;
  appHistoryDatasource: BehaviorSubject<boolean>;

  constructor(private store: Store<IAppStore>) {
    this.store.select('calculatorState').subscribe((state) => {
      const { resultHistoryCache } = state;
      this.resultHistory = cloneDeep(resultHistoryCache);
      this.hasCachedHistory = resultHistoryCache?.length > 0;
    });
    this.appHistoryDatasource = new BehaviorSubject<boolean>(false);
  }

  ngOnDestroy(): void {
    this.appHistoryDatasource.unsubscribe();
  }
  
  getItem = (id: string) => {
    return this?.resultHistory.find((item) => item.id.toString() == id);
  };

  getDateRange = (item: IResultHistoryCacheItem) => {
    const { resultHistory } = item;
    const samples = resultHistory.length;

    return `(${resultHistory[0].timestamp} -
      ${resultHistory[samples - 1].timestamp})`;
  };

  getSummary = (id: string) => {
    const item = this.getItem(id);

    return item
      ? `id: ${item.id?.toString()} ${this.getDateRange(item)}}`
      : `id: ${id}`;
  };

  getCount = () => this.resultHistory ? this.resultHistory.length : 0;

  clearHistory = () => {
    this.store.dispatch(clearResultsHistoryCache());
    this.appHistoryDatasource.next(true);
  }

  hasHistory = () => this.hasCachedHistory;

}
