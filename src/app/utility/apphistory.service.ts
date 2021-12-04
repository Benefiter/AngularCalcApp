import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IAppStore,
  IResultHistoryCacheItem,
} from 'src/app/redux/calculator.state.model';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ApphistoryService {
  resultHistory: IResultHistoryCacheItem[] = [];

  constructor(private store: Store<IAppStore>) {
    this.store.select('calculatorState').subscribe((state) => {
      const { resultHistoryCache } = state;
      this.resultHistory = cloneDeep(resultHistoryCache);
    });
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
}
