import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/utility/notification.service';
import {
  CalculatorButton,
  CalculatorButtonContext,
} from 'src/app/models/calculatorButtons';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/redux/calculator.state.model';
import { operators } from './../../../../constants';

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

  constructor(
    private notifyService: NotificationService,
    private store: Store<IAppStore>
  ) {
    this.operators = operators;
    this.calculatorButtons = CalculatorButtonContext;
    this.currentValue = 0;
  }

  ngOnInit(): void {
    this.store.select('calculatorState').subscribe((state) => {
      this.operand = state.operand;
      this.prevOperand = state.prevOperand;
      const { currentValue } = state;
      if (this.currentValue !== currentValue) {
        this.notifyService?.showInfoWithTimeout(
          'Result',
          currentValue.toString(),
          3000
        );
        this.currentValue = currentValue;
      }
    });
  }
}
