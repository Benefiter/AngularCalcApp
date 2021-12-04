import { Component, OnInit, Input } from '@angular/core';
import { operators } from 'src/app/constants';
import { CalculatorButton, CalculatorButtonContext } from 'src/app/models/calculatorButtons';
import { NotificationService } from 'src/app/utility/notification.service';

const ResultTimeout = 1000;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  @Input() operand: string;
  @Input() prevOperand: string;
  currentOperation: string;
  currentValue: Number;
  calculatorButtons: CalculatorButton[];

  constructor(private notifyService: NotificationService) {
    this.operand = '';
    this.prevOperand = '';
    this.currentOperation = '';
    this.currentValue = 0;
    this.calculatorButtons = CalculatorButtonContext;
  }
  ngOnInit(): void {}

  handleCalcButtonOperationEmit(event: string) {
    switch (event) {
      case 'AC':
        this.handleACButton();
        break;
      case 'DEL':
        this.handleDELButton();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.operand += event;
        break;
      case '.':
        if (this.operand.includes('.')) break;
        this.operand += event;
        break;
      case '0':
        if (this.operand === '0') break;
        this.operand += event;
        break;
      case '+':
      case '*':
      case '-':
      case '/':
        this.handleOperationButton(event);
        break;
      case '=':
        this.handleExecuteButton();
        break;
    }
  }

  handleACButton() {
    this.operand = '';
    this.prevOperand = '';
    this.currentOperation = '';
  }

  handleDELButton() {
    if (this.operand === '') {
      if (
        this.prevOperand !== '' &&
        operators.includes(this.prevOperand.slice(-1))
      ) {
        this.currentOperation = '';
        this.operand = this.getPrevOperand().toString();
        this.prevOperand = '';
      }
      return;
    }
    this.operand = this.operand.slice(0, -1);
  }

  handleOperationButton(event: string) {
    if (this.operand === '' && this.prevOperand === '' || this.operand === '') return;

    if (this.currentOperation !== '') {
      const result = this.execute('').toString();
      this.prevOperand = `${result} ${event}`;
      this.operand = '';
      this.currentOperation = event;
      this.notifyService?.showInfoWithTimeout("Result", result, ResultTimeout )
      return;
    }
    this.currentOperation = event;
    this.prevOperand = `${this.operand} ${event}`;
    this.operand = '';
  }

  handleExecuteButton() {
    if (this.prevOperand === '' || this.operand === '') return;
    this.operand = this.execute('').toString();
    this.prevOperand = '';
    this.currentOperation = '';
    this.notifyService?.showInfoWithTimeout("Result", this.operand, ResultTimeout )
  }

  execute(operation: string) {
    const theOperation = operation === '' ? this.currentOperation : operation;
    const theOperand = Number(this.operand);

    switch (theOperation) {
      case '+':
        return (Number(this.getPrevOperand()) + theOperand).toString();
      case '*':
        return (Number(this.getPrevOperand()) * theOperand).toString();
      case '-':
        return (Number(this.getPrevOperand()) - theOperand).toString();
      case '/':
        return (Number(this.getPrevOperand()) / theOperand).toString();
      default:
        // Should never happen...
        return Number.NaN;
    }
  }

  getPrevOperand() {
    if (this.prevOperand === '') return '';

    return Number(this.prevOperand.slice(0, this.prevOperand.length - 2));
  }
}
