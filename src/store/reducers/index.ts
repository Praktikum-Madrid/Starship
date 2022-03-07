import { combineReducers } from 'redux';
import { authReducer } from 'store/reducers/auth';
import { settingsReducer } from 'store/reducers/settings';
import { gameReducer } from 'store/reducers/game';

export const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>
