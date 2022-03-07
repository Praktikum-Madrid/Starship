import { TGameSettings } from 'types';

const ACTIONS = {
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
  SET_SCORE: 'SET_SCORE',
  SET_IS_GAME: 'SET_IS_GAME',
  SET_IS_QUIT: 'SET_IS_QUIT',
};

const defaultState: TGameSettings = {
  isFullscreen: false,
  score: 0,
  isGame: false,
  isQuit: false,
};

export function gameReducer(state: TGameSettings = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: !state.isFullscreen,
      };
    case ACTIONS.SET_SCORE:
      return {
        ...state,
        score: payload.score,
      };
    case ACTIONS.SET_IS_GAME:
      return {
        ...state,
        isGame: payload.isGame,
      };
    case ACTIONS.SET_IS_QUIT:
      return {
        ...state,
        isQuit: payload.isQuit,
      };
    default:
      return state;
  }
}

export function toggleGameFullscreen() {
  return {
    type: ACTIONS.TOGGLE_FULLSCREEN,
  };
}

export function setGameScore(payload: Record<string, any>) {
  return {
    type: ACTIONS.SET_SCORE,
    payload,
  };
}

export function setIsGame(payload: Record<string, any>) {
  return {
    type: ACTIONS.SET_IS_GAME,
    payload,
  };
}

export function setIsQuit(payload: Record<string, any>) {
  return {
    type: ACTIONS.SET_IS_QUIT,
    payload,
  };
}
