import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import IChartSample from 'src/app/models/chartSample';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  type: string;
  data: object | undefined;
  options: object | undefined;
  currentValue: Number | undefined;
  chartSamples: IChartSample[] = [];

  constructor(private store: Store<IAppStore>) {
    store.select('calculatorState').subscribe;
    this.type = 'line';
    this.data = {
      datasets: [
        {
          label: 'Calculator Value Trend',
          data: [
          ],
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
              maxTicksLimit: 10,
            },
          },
        ],
      },
    };
  }

  ngOnInit(): void {
    this.store?.select('calculatorState')?.subscribe((state) => {
      const { currentValue } = state;
      if (this.currentValue !== currentValue) {
        this.currentValue = currentValue;
        console.log('resulthistory');
        console.log(state.resultHistory);
        this.updateChartData(state.resultHistory);
      }
    });
  }

  updateChartData(samples: ICalcResult[]) {
    console.log('updateChartData called');
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
    console.log('data ****');
    console.log(this.data);
  }
}
