/* eslint-disable import/prefer-default-export */

export const ACTIONS = {
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
  SET_SCORE: 'SET_SCORE',
  SET_IS_GAME: 'SET_IS_GAME',
  SET_IS_QUIT: 'SET_IS_QUIT',
};

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

export function setIsGameStarted(payload: Record<string, any>) {
  return {
    type: ACTIONS.SET_IS_GAME,
    payload,
  };
}

export function setIsGameQuited(payload: Record<string, any>) {
  return {
    type: ACTIONS.SET_IS_QUIT,
    payload,
  };
}
