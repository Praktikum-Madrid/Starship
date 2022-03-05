import { combineReducers } from 'redux';
import { authReducer } from 'store/reducers/auth';
import { settingsReducer } from 'store/reducers/settings';

export const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
