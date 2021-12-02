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
} from './calculator.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

const operators = ['*', '+', '-', '/'];

const updateHistory = (
  resultHistory: ICalcResult[] | undefined,
  result: ICalcResult
) => {
  return resultHistory ? [...resultHistory, result] : [];
};

const handleButtonClick = (state: IAppState, button: string) => {
  let updatedState = cloneDeep(state);
  handleCalcButtonOperationEmit(updatedState, button);
  return { ...updatedState, button };
};

const _calculatorStateReducer = createReducer(
  INITIAL_STATE,
  on(setOperand, (state, { operand }) => {
    console.log('setOperand');
    return { ...state, operand };
  }),
  on(setButtonClick, (state, { button }) => handleButtonClick(state, button)),
  on(setOperator, (state, { operator }) => ({ ...state, operator })),
  on(updateResultsHistory, (state, { sample }) => ({
    ...state,
    resultHistory: updateHistory([...state.resultHistory], sample),
  }))
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
    const result = execute(
      state.currentOperation,
      state.operand,
      state.prevOperand
    ).toString();
    state.prevOperand = `${result} ${operation}`;
    state.operand = '';
    state.currentOperation = operation;
    state.currentValue = Number(result);
    return;
  }
  state.currentOperation = operation;
  state.prevOperand = `${state.operand} ${operation}`;
  state.operand = '';
};

const handleExecuteButton = (state: IAppState) => {
  if (state.prevOperand === '' || state.operand === '') return;
  state.operand = execute(
    state.currentOperation,
    state.operand,
    state.prevOperand
  ).toString();
  state.prevOperand = '';
  state.currentOperation = '';
  state.currentValue = Number(state.operand);
};

const execute = (operation: string, operand: string, prevOperand: string) => {
  const theOperand = Number(operand);

  switch (operation) {
    case '+':
      return (Number(getPrevOperand(prevOperand)) + theOperand).toString();
    case '*':
      return (Number(getPrevOperand(prevOperand)) * theOperand).toString();
    case '-':
      return (Number(getPrevOperand(prevOperand)) - theOperand).toString();
    case '/':
      return (Number(getPrevOperand(prevOperand)) / theOperand).toString();
    default:
      // Should never happen...
      return Number.NaN;
  }
};

const getPrevOperand = (prevOperand: string) => {
  if (prevOperand === '') return '';

  return Number(prevOperand.slice(0, prevOperand.length - 2));
};
