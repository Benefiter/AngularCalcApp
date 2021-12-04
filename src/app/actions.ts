import { ICalcResult } from './redux/calculator.state.model';

export const SET_OPERAND = 'SET_OPERAND';
export const SET_PREVOPERAND = 'SET_PREVOPERAND';
export const SET_CURRENTOPERATION = 'SET_CURRENTOPERATION';
export const SET_CURRENTVALUE = 'SET_CURRENTVALUE';
export const SET_PREVVALUE = 'SET_PREVVALUE';
export const UPDATE_HISTORY = 'UPDATE_HISTOR';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export interface IAction {
    payload: string | number | ICalcResult | undefined;
}
