import {
  IAppState,
  ICalcResult,
  INITIAL_STATE,
} from './calculator.state.model';
import {
  setOperand,
  setOperator,
  updateResultsHistory,
  setButtonClick,
  clearResultsHistory,
} from './calculator.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { operators } from '../constants';

const updateHistory = (
  resultHistory: ICalcResult[] | undefined,
  result: ICalcResult
) => {
  return resultHistory ? [...resultHistory, result] : [result];
};

const handleButtonClick = (state: IAppState, button: string) => {
  let updatedState = cloneDeep(state);
  handleCalcButtonOperationEmit(updatedState, button);
  return { ...updatedState, button };
};

const _calculatorStateReducer = createReducer(
  INITIAL_STATE,
  on(setOperand, (state, { operand }) => {
    return { ...state, operand };
  }),
  on(setButtonClick, (state, { button }) => handleButtonClick(state, button)),
  on(setOperator, (state, { operator }) => ({ ...state, operator })),
  on(updateResultsHistory, (state, { sample }) => ({
    ...state,
    resultHistory: updateHistory([...state.resultHistory], sample),
  })),
  on(clearResultsHistory, (state, {}) => {
    return {
    ...state,
    resultHistory: [],
  }})
);

export const calculatorStateReducer = (
  state: IAppState | undefined,
  action: Action
) => {
  return _calculatorStateReducer(state, action);
};

const handleCalcButtonOperationEmit = (state: IAppState, button: string) => {
  switch (button) {
    case 'AC':
      handleACButton(state);
      break;
    case 'DEL':
      handleDELButton(state);
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
      state.operand += button;
      break;
    case '.':
      if (state.operand.includes('.')) break;
      state.operand += button;
      break;
    case '0':
      if (state.operand === '0') break;
      state.operand += button;
      break;
    case '+':
    case '*':
    case '-':
    case '/':
      handleOperationButton(state, button);
      break;
    case '=':
      handleExecuteButton(state);
      break;
  }
};

const handleACButton = (state: IAppState) => {
  state.operand = '';
  state.prevOperand = '';
  state.currentOperation = '';
};

const handleDELButton = (state: IAppState) => {
  if (state.operand === '') {
    if (
      state.prevOperand !== '' &&
      operators.includes(state.prevOperand.slice(-1))
    ) {
      state.currentOperation = '';
      state.operand = getPrevOperand(state.prevOperand).toString();
      state.prevOperand = '';
    }
    return;
  }
  state.operand = state.operand.slice(0, -1);
};

const handleOperationButton = (state: IAppState, operation: string) => {
  if (
    (state.operand === '' && state.prevOperand === '') ||
    state.operand === ''
  )
    return;

  if (state.currentOperation !== '') {
    execute(state);
    state.prevOperand = `${state.operand} ${operation}`;
    state.currentValue = Number(state.operand);
    state.operand = '';
    state.currentOperation = operation;
    return;
  }
  state.currentOperation = operation;
  state.prevOperand = `${state.operand} ${operation}`;
  state.operand = '';
};

const handleExecuteButton = (state: IAppState) => {
  if (state.prevOperand === '' || state.operand === '') return;
  execute(state);
  state.prevOperand = '';
  state.currentOperation = '';
  state.currentValue = Number(state.operand);
};

const execute = (state: IAppState) => {
  const { currentOperation, operand, prevOperand } = state;

  const theOperand = Number(operand);
  let result: Number | undefined;
  switch (currentOperation) {
    case '+':
      result = Number(getPrevOperand(prevOperand)) + theOperand;
      break;
    case '*':
      result = Number(getPrevOperand(prevOperand)) * theOperand;
      break;
    case '-':
      result = Number(getPrevOperand(prevOperand)) - theOperand;
      break;
    case '/':
      result = Number(getPrevOperand(prevOperand)) / theOperand;
      break;
    default:
    // Should never happen...
  }

  if (!result) return Number.NaN;

  state.operand = result.toString();
  state.resultHistory = [
    ...state.resultHistory,
    { timestamp: new Date().toString(), value: result },
  ];

  return result;
};

const getPrevOperand = (prevOperand: string) => {
  if (prevOperand === '') return '';

  return Number(prevOperand.slice(0, prevOperand.length - 2));
};
