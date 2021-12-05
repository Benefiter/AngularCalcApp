import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import IChartSample from 'src/app/models/chartSample';
import {
  cacheResultHistory,
  clearResultsHistory,
} from 'src/app/redux/calculator.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { ActiveToast } from 'ngx-toastr';
import { DndService } from '@ng-dnd/core';
import { ApphistoryService } from '../../../services/apphistory.service';
import { DragAndDropKeys, MAX_CHART_LINES } from 'src/app/constants';
import { ChartLineColors } from './../../../constants';

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
  droppedItemIds: string[] = [];

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
          backgroundColor: ChartLineColors[0],
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
  ngOnInit(): void {
    this.target = this.dnd.dropTarget<{ id: string }>(DragAndDropKeys.historyItem, {
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
    if (this.chartSamples.length == 0 && this.appHistoryService.getCount() == 0)
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
          ...this.data.datasets[0],
          data: [...this.chartSamples],
        },
      ],
    };
  }

  toggleHidden = () => {
    this.hidden = !this.hidden;
  };

  clearChartHistory = () => {
    this.store.dispatch(clearResultsHistory());
    this.data = {
      ...this.data,
      datasets: [
        {
          ...this.data.datasets[0],
          data: [],
        },
      ],
    };
    this.droppedItemIds = [];
  };

  cacheTrend = () => this.store.dispatch(cacheResultHistory());

  handleDroppedHistoryItem = (id: string) => {
    console.log('this.data');
    console.log(this.data);

    if (this.data.datasets.length == MAX_CHART_LINES) {
      return;
    }

    if (this.droppedItemIds.find((item) => item == id)) return;

    this.droppedItemIds.push(id);

    const historyItem = this.appHistoryService.getItem(id);

    if (historyItem == null) return;

    this.data = {
      ...this.data,
      datasets: [
        ...this?.data?.datasets,
        {
          label: id,
          backgroundColor: ChartLineColors[this.data.datasets.length],
          data: historyItem?.resultHistory?.map((h) => ({
            x: h.timestamp,
            y: h.value,
          })),
        },
      ],
    };

    // purge empty datasets
    this.data = {
      ...this.data,
      datasets: this.data.datasets.filter((d: { data: string | any[]; }) => d.data.length > 0)
    }
    if (this.data.datasets.length == MAX_CHART_LINES) {
      this.notifyService.showInfo('', 'Maximum number of chart lines has been reached.');
    }

  };
}
