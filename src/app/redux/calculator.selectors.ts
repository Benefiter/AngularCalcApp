import { IAppStore } from 'src/app/redux/calculator.state.model';

export const selectOperation = (state: IAppStore) => state.calculatorState.currentOperation;
export const selectCurrentValue = (state: IAppStore) => state.calculatorState.currentValue;
export const selectOperand = (state: IAppStore) => state.calculatorState.operand;
export const selectPrevOperand = (state: IAppStore) => state.calculatorState.prevOperand;
export const selectResultHistory = (state: IAppStore) => state.calculatorState.resultHistory;
export const selectState = (state: IAppStore) => state.calculatorState;

