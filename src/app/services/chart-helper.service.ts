import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICalcResult } from '../redux/calculator.state.model';
import IChartSample, {
  ChartLineColors,
  CHART_OPTIONS,
  DEFAULT_ChartServiceBehaviourSubjectData_State,
  DEFAULT_CHART_DATA_STATE,
  IChartServiceBehaviourSubjectData,
} from './chart-helper.constants';

@Injectable({
  providedIn: 'root',
})
export class ChartHelperService {
  chartData: IChartServiceBehaviourSubjectData[] = [];
  chartDataSource: BehaviorSubject<IChartServiceBehaviourSubjectData>;

  constructor() {
    this.chartDataSource = new BehaviorSubject<IChartServiceBehaviourSubjectData>(
      DEFAULT_ChartServiceBehaviourSubjectData_State
    );
  
  }

  ngOnDestroy(): void {
    this.chartDataSource.unsubscribe();
  }

  defaultChartDataState = () => ({...DEFAULT_CHART_DATA_STATE});
  chartOptions = () => CHART_OPTIONS;

  updateChartData = (
    targetId: number,
    samples: ICalcResult[]
  ) => {
    const chartData = this.getChartDataWithTargetId(targetId);
    if (chartData == null) return;
    if (samples == null) return;
    if (samples.length == chartData.chartSamples.length) return;

    chartData.chartSamples = samples.map((sample) => ({
      x: sample.timestamp,
      y: sample.value.toString(),
    }));

    chartData.data = {
      ...chartData.data,
      datasets: [
        {
          ...chartData.data.datasets[0],
          data: [...chartData.chartSamples],
        },
      ],
    };


    this.chartDataSource.next({ ...chartData });
  };

  register = (targetId: number) => {
    if (this.alreadyRegistered(targetId)) return;

    this.chartData.push({ targetId, chartSamples: [], data: {...DEFAULT_CHART_DATA_STATE} });
  };

  alreadyRegistered = (targetId: number) => {
    return this.chartData?.some((item) => item.targetId == targetId);
  };

  getChartDataWithTargetId = (targetId: number) => {
    return this.chartData.find((item) => item.targetId == targetId);
  };

  hasDataForChart = (targetId: number) => {
    const item = this.getChartDataWithTargetId(targetId);

    return item && item?.data?.datasets.some(d => d.data.length > 0);
  };

  clearChart = (targetId: number) => {
    const item = this.getChartDataWithTargetId(targetId);
    if (item == null) return;

    item.data =
    {
      ...item.data,
      datasets: [...DEFAULT_CHART_DATA_STATE.datasets]
    };


    this.chartDataSource.next({ ...item });
  };

  addChart = (targetId: number, chartData: IChartSample[], title: string) => {
    const item = this.getChartDataWithTargetId(targetId);
    if (item == null) return;

    item.data = {
      ...item.data,
      datasets: [
        ...item.data.datasets,
        {
          label: title,
          backgroundColor: ChartLineColors[item.data.datasets.length],
          data: chartData,
        },
      ],
    };

    // purge empty datasets
    item.data = {
      ...item.data,
      datasets: item.data.datasets.filter(
        (d: { data: string | any[] }) => d.data.length > 0
      ),
    };

    this.chartDataSource.next({ ...item });
  };
}
