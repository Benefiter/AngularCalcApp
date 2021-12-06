import { createAction, props } from '@ngrx/store';
import { ICalcResult } from './calculator.state.model';
import { CalculatorActionTypes } from './calculatorActionType.enum';

export const setOperand = createAction(
    CalculatorActionTypes.SetOperand,
    props<{operand: string}>()
)

export const setOperator = createAction(
    CalculatorActionTypes.SetCurrentOperator,
    props<{operator: string}>()
)

export const setButtonClick = createAction(
    CalculatorActionTypes.SetButtonClick,
    props<{button: string}>()
)

export const updateResultsHistory = createAction(
    CalculatorActionTypes.UpdateHistory,
    props<{sample: ICalcResult}>()
)

export const cacheResultHistory = createAction(
    CalculatorActionTypes.CacheHistory
)

export const clearResultsHistory = createAction(
    CalculatorActionTypes.ClearHistory
)

export const clearResultsHistoryCache = createAction(
    CalculatorActionTypes.ClearHistoryCache
)

