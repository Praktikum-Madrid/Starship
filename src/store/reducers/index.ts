import { combineReducers } from 'redux';
import { authReducer } from 'store/reducers/auth';
import { settingsReducer } from 'store/reducers/settings';
import { gameReducer } from 'store/reducers/game';
import { modeReducer } from 'store/reducers/mode';
import { forumReducer } from 'store/reducers/forum';

export const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  game: gameReducer,
  mode: modeReducer,
  forum: forumReducer,
});

export type RootState = ReturnType<typeof rootReducer>
