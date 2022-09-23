// A typescript interface that describes (For the typescript compiler) the data that is stored in the state
// that is neede by the app module.
import * as fromErrors from './reducers/errors.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AppState {
  errors: fromErrors.ErrorsState;
}

// the functions that will handle the state for the application module. Since we have no state, there are no functions.
export const reducers: ActionReducerMap<AppState> = {
  errors: fromErrors.reducer,
};

// 1. Create a Feature Select (we don't have one!)

// 2. Selector Per Branch

const selectErrorsBranch =
  createFeatureSelector<fromErrors.ErrorsState>('errors');

// 3. Any helpers (optional)

// 4. What our Component Needs

export const selectHasAnError = createSelector(
  selectErrorsBranch,
  (b) => b.hasErrors
);

export const selectErrorMessage = createSelector(
  selectErrorsBranch,
  (b) => b.message
);
