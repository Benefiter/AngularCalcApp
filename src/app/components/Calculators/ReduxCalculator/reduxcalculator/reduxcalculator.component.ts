import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import {
  CalculatorButton,
  CalculatorButtonContext,
} from 'src/app/models/calculatorButtons';
import { Store } from '@ngrx/store';
import { IAppStore, ICalcResult } from 'src/app/redux/calculator.state.model';
import { operators } from './../../../../constants';
import { ApphistoryService } from './../../../../services/apphistory.service';

@Component({
  selector: 'app-reduxcalculator',
  templateUrl: './reduxcalculator.component.html',
  styleUrls: ['./reduxcalculator.component.css'],
})
export class ReduxcalculatorComponent implements OnInit {
  @Input() operand: string | undefined;
  @Input() prevOperand: string | undefined;
  currentValue: Number;
  operators: Array<string>;
  calculatorButtons: CalculatorButton[];
  chartSamples: ICalcResult[] = [];
  appHistoryExists = false;

  constructor(
    private notifyService: NotificationService,
    private store: Store<IAppStore>,
    private appHistoryService: ApphistoryService,
  ) {
    this.operators = operators;
    this.calculatorButtons = CalculatorButtonContext;
    this.currentValue = 0;
  }

  ngOnInit(): void {
    this.store.select('calculatorState').subscribe((state) => {
      this.appHistoryExists = this.appHistoryService.getCount() > 0;
      this.operand = state.operand;
      this.prevOperand = state.prevOperand;
      const { currentValue, resultHistory } = state;
      if (this.currentValue !== currentValue && this.chartSamples.length != 0) {
        this.notifyService?.showInfoWithTimeout(
          'Result',
          currentValue.toString(),
          3000
        );
        this.currentValue = currentValue;
        this.chartSamples = [...resultHistory];
      }
    });
  }
}
