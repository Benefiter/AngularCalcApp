export interface ICalcResult {
  timestamp: string;
  value: Number;
}

export interface IResultHistoryCacheItem {
  id: number;
  resultHistory: ICalcResult[];
}

export interface IAppState {
  operand: string;
  prevOperand: string;
  currentOperation: string;
  currentValue: Number;
  prevValue: Number;
  resultHistory: ICalcResult[];
  cacheId: number
  resultHistoryCache: IResultHistoryCacheItem[];
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
  cacheId: 1,
  resultHistoryCache: []
};

