import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import IChartSample from 'src/app/models/chartSample';
import {
  cacheResultHistory,
  clearResultsHistory,
} from 'src/app/redux/calculator.actions';
import { NotificationService } from 'src/app/utility/notification.service';
import { ActiveToast } from 'ngx-toastr';
import { DndService } from '@ng-dnd/core';
import { ApphistoryService } from './../../../utility/apphistory.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  type: string;
  data: any | undefined;
  options: object | undefined;
  currentValue: Number | undefined;
  chartSamples: IChartSample[] = [];
  hidden: boolean = false;
  activeToast: ActiveToast<any> | undefined;
  hasSamples: boolean = false;
  droppedItems: string[] = [];

  constructor(
    private store: Store<IAppStore>,
    private notifyService: NotificationService,
    private dnd: DndService,
    private appHistoryService: ApphistoryService
  ) {
    store.select('calculatorState').subscribe;
    this.type = 'line';
    this.data = {
      datasets: [
        {
          label: 'Calculator Value Trend',
          data: [],
        },
      ],
    };
    this.options = {
      scales: {
        xAxes: [
          {
            type: 'time',
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5,
            },
          },
        ],
      },
    };
  }

  target: any
  droppedItem: any;
  ngOnInit(): void {
    this.target = this.dnd.dropTarget<{id: string}>('historyItem', {
      drop: (monitor) => {
        const result = monitor.getItem();
        result && this.handleDroppedHistoryItem(result.id);
      },
    });

    this.store?.select('calculatorState')?.subscribe((state) => {
      const { currentValue, resultHistory } = state;
      if (this.currentValue !== currentValue) {
        this.currentValue = currentValue;
        this.updateChartData(state.resultHistory);
      }
      if (resultHistory?.length == 0) this.updateChartData(resultHistory);
      this.hasSamples = resultHistory?.length > 0;
    });
    // Need to change the notify message to handle bug in 3rd party app...
    this.chartSamples.length == 0 &&
      (this.activeToast = this.notifyService.showInfo(
        '',
        `Generate calculator results and watch them trend on the chart! (${new Date().getMilliseconds()})`
      ));
  }

  ngOnDestroy(): void {
    this.activeToast?.toastRef.close();
    this.target?.unsubscribe();
  }

  updateChartData(samples: ICalcResult[]) {
    if (samples == null) return;
    if (samples.length == this.chartSamples.length) return;

    this.chartSamples = samples.map((sample) => ({
      x: sample.timestamp,
      y: sample.value.toString(),
    }));
    this.data = {
      ...this.data,
      datasets: [
        {
          label: 'Calculator Value Trend',
          data: [...this.chartSamples],
        },
      ],
    };
  }

  toggleHidden = () => {
    this.hidden = !this.hidden;
  };

  clearChartHistory = () => this.store.dispatch(clearResultsHistory());

  cacheTrend = () => this.store.dispatch(cacheResultHistory());

  handleDroppedHistoryItem = (id: string) => {
    if (this.droppedItems.find(item => item == id)) return;

    const historyItem = this.appHistoryService.getItem(id);
    if (historyItem == null) return;

    this.data = {
      ...this.data,
      datasets: [...this?.data?.datasets, {label: id, data: historyItem?.resultHistory?.map(h => ({x: h.timestamp, y: h.value})) } ]
    }
  }
}
