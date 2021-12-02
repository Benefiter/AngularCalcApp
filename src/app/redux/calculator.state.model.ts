export interface ICalcResult {
  timeStamp: Date;
  value: Number;
}

export interface IAppState {
  operand: string;
  prevOperand: string;
  currentOperation: string;
  currentValue: Number;
  prevValue: Number;
  resultHistory: ICalcResult[];
}

export interface IAppStore {
    calculatorState: IAppState;
}

export const INITIAL_STATE: IAppState = {
  operand: '',
  prevOperand: '',
  currentOperation: '',
  currentValue: 0,
  prevValue: 0,
  resultHistory: [],
};

