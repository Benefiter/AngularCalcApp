export const ChartLineColors = [
  'rgba(0 0, 0, 0.1)',
  'rgba(0, 0, 0, 0.2)',
  'rgba(0, 0, 0, 0.3)',
  'rgba(0, 0, 0, 0.4)',
];
export const MAX_CHART_LINES = 4;

export const DEFAULT_CHART_DATA_STATE = {
  datasets: [
    {
      label: 'Calculator Value Trend',
      data: [],
      backgroundColor: ChartLineColors[0],
    },
  ],
};

export const CHART_OPTIONS = {
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

export interface IChartDataset {
  label: string;
  data: IChartSample[];
  backgroundColor: string;
}
export type IChartData = { datasets: IChartDataset[] };

export interface IChartServiceBehaviourSubjectData {
  targetId: number;
  chartSamples: IChartSample[];
  data: IChartData;
}

export default interface IChartSample {
  x: string;
  y: string;
}

export const EMPTY_DATASETS = { datasets: [] };

export const DEFAULT_ChartServiceBehaviourSubjectData_State = {
  targetId: 0,
  chartSamples: [],
  data: EMPTY_DATASETS,
};
