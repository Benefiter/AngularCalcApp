import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import IChartSample from 'src/app/models/chartSample';
import { clearResultsHistory } from 'src/app/redux/calculator.actions';
import { NotificationService } from 'src/app/utility/notification.service';

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
  hidden: boolean = false;

  constructor(private store: Store<IAppStore>, private notifyService: NotificationService) {
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

  ngOnInit(): void {
    this.store?.select('calculatorState')?.subscribe((state) => {
      const { currentValue, resultHistory } = state;
      if (this.currentValue !== currentValue) {
        this.currentValue = currentValue;
        this.updateChartData(state.resultHistory);
      }
      if (resultHistory?.length == 0) this.updateChartData(resultHistory);
    });
    this.notifyService.showInfo('Chart','Generate calculator results and watch them trend on the chart!');
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
  }

  clearChartHistory = () => this.store.dispatch(clearResultsHistory());
}
