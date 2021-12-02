import { ICalcResult } from './calcResult';
import {
  SET_OPERAND,
  SET_PREVOPERAND,
  SET_CURRENTOPERATION,
  SET_CURRENTVALUE,
  SET_PREVVALUE,
  UPDATE_HISTORY,
  CLEAR_HISTORY,
  IAction,
} from './actions';
import { Action } from 'redux';

export interface IAppState {
  operand: string;
  prevOperand: string;
  currentOperation: string;
  currentValue: Number;
  prevValue: Number;
  resultHistory: ICalcResult[];
}

export const INITIAL_STATE: IAppState = {
  operand: '',
  prevOperand: 'string',
  currentOperation: 'string',
  currentValue: 0,
  prevValue: 0,
  resultHistory: [],
};

const updateHistory = (resultHistory: ICalcResult[] | undefined, result: ICalcResult) => {
    return resultHistory ? [...resultHistory, result] : [];
}

export const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_OPERAND:
      return { ...state, operand: action.payload };
    case SET_PREVOPERAND:
      return { ...state, prevOperand: action.payload };
    case SET_CURRENTOPERATION:
      return { ...state, currentOperation: action.payload };
    case SET_CURRENTVALUE:
      return { ...state, currentValue: action.payload };
    case SET_PREVVALUE:
        return { ...state, prevValue: action.payload}
    case UPDATE_HISTORY:
        return { ...state, resultHistory: updateHistory(state?.resultHistory, action.payload as ICalcResult)}
    case CLEAR_HISTORY:
        return { ...state, resultHistory: []}
    default:
      return state;
  }
}
