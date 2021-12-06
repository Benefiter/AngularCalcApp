import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import {
  cacheResultHistory,
  clearResultsHistory,
} from 'src/app/redux/calculator.actions';
import { NotificationService } from 'src/app/services/notification.service';
import { ActiveToast } from 'ngx-toastr';
import { DndService } from '@ng-dnd/core';
import { ApphistoryService } from '../../../services/apphistory.service';
import { DragAndDropKeys } from 'src/app/constants';
import {
  MAX_CHART_LINES,
  IChartData,
  IChartServiceBehaviourSubjectData,
} from './../../../services/chart-helper.constants';
import { ChartHelperService } from './../../../services/chart-helper.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  type: string;
  data: IChartData;
  options: object | undefined;
  currentValue: Number | undefined;
  hidden: boolean = false;
  activeToast: ActiveToast<any> | undefined;
  hasSamples: boolean = false;
  droppedItemIds: string[] = [];
  target: any;
  targetId = 1;

  constructor(
    private store: Store<IAppStore>,
    private notifyService: NotificationService,
    private dnd: DndService,
    private appHistoryService: ApphistoryService,
    private helperService: ChartHelperService
  ) {
    store.select('calculatorState').subscribe;
    this.type = 'line';
    this.data = this.helperService.defaultChartDataState();
    this.options = this.helperService.chartOptions();
  }

  initDragDropTarget = () => {
    this.target = this.dnd.dropTarget<{ id: string }>(
      DragAndDropKeys.historyItem,
      {
        drop: (monitor) => {
          const result = monitor.getItem();
          result && this.handleDroppedHistoryItem(result.id);
        },
      }
    );
  };

  monitorCalculatorStoreChanges = () => {
    this.store?.select('calculatorState')?.subscribe((state) => {
      const { currentValue, resultHistory } = state;
      if (this.currentValue !== currentValue) {
        this.currentValue = currentValue;
        resultHistory && this.updateChartData(state.resultHistory);
      }
      if (resultHistory?.length == 0) this.updateChartData(resultHistory);
      this.hasSamples = resultHistory?.length > 0;
    });
  };

  ngOnInit(): void {
    this.initDragDropTarget();
    this.monitorCalculatorStoreChanges();
    try {
      this.helperService.chartDataSource.subscribe(
        (chartDataUpdate) =>
          chartDataUpdate.targetId == this.targetId &&
          this.updateChartDataFromService(chartDataUpdate)
      );
    } catch (ObjectUnsubscribedError) {
      this.helperService = new ChartHelperService();
      this.helperService.chartDataSource.subscribe(
        (chartDataUpdate) =>
          chartDataUpdate.targetId == this.targetId &&
          this.updateChartDataFromService(chartDataUpdate)
      );
    }
    this.helperService.register(this.targetId);

    try {
      this.appHistoryService.appHistoryDatasource.subscribe(
        () => this.clearChart()
      );
    } catch (ObjectUnsubscribedError) {
      this.appHistoryService = new ApphistoryService(this.store);
      this.appHistoryService.appHistoryDatasource.subscribe(
        () => this.clearChart()
      );
    }
  }

  ngOnDestroy(): void {
    this.activeToast?.toastRef.close();
    this.target?.unsubscribe();
    this.helperService.chartDataSource.unsubscribe();
  }

  updateChartDataFromService = (
    chartData: IChartServiceBehaviourSubjectData
  ) => {
    this.data = chartData?.data;
    if (this.data.datasets.length == MAX_CHART_LINES) {
      this.notifyService.showInfo(
        '',
        'Maximum number of chart lines has been reached.'
      );
    }
  };

  updateChartData = (samples: ICalcResult[]) => {
    this.helperService.updateChartData(this.targetId, samples);
  };

  toggleHidden = () => {
    this.hidden = !this.hidden;
  };

  clearChart = () => {
    this.store.dispatch(clearResultsHistory());
    this.helperService.clearChart(this.targetId);
    this.droppedItemIds = [];
  };

  cacheTrend = () => this.store.dispatch(cacheResultHistory());

  handleDroppedHistoryItem = (id: string) => {
    if (this.data.datasets.length == MAX_CHART_LINES) {
      return;
    }

    if (this.droppedItemIds.find((item) => item == id)) return;

    this.droppedItemIds.push(id);

    const historyItem = this.appHistoryService.getItem(id);

    if (historyItem == null) return;

    const chartData = historyItem?.resultHistory?.map((h) => ({
      x: h.timestamp,
      y: h.value.toString(),
    }));

    this.helperService.addChart(
      this.targetId,
      chartData,
      historyItem.id.toString()
    );
  };
}
