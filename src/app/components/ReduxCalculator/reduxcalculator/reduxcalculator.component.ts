import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/utility/notification.service';
import {
  CalculatorButton,
  CalculatorButtonContext,
} from '../../EventingCalculator/calculator/CalculatorButtonContext';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, IAppStore } from 'src/app/redux/calculator.state.model';
import * as calcSelectors from 'src/app/redux/calculator.selectors';

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
    this.operators = ['*', '+', '-', '/'];
    this.calculatorButtons = CalculatorButtonContext;
    this.currentValue = 0;
  }

  ngOnInit(): void {
    this.store
      .select('calculatorState')
      .subscribe((state) => (this.operand = state.operand));
    this.store
      .select('calculatorState')
      .subscribe((state) => (this.prevOperand = state.prevOperand));
    this.store.select('calculatorState').subscribe((state) => {
      const { currentValue } = state;
      if (this.currentValue !== currentValue) {
        this.notifyService.showInfoWithTimeout(
          'Result',
          currentValue.toString(),
          3000
        );
        this.currentValue = currentValue;
      }
    });
  }
}
