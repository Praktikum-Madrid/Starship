/* eslint-disable import/prefer-default-export */

import { ACTIONS } from 'store/actions/game';
import { TGameSettings } from 'types';

const defaultState: TGameSettings = {
  isFullscreen: false,
  score: 0,
  isGameStarted: false,
  isGameQuited: false,
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
        isGameStarted: payload.isGameStarted,
      };
    case ACTIONS.SET_IS_QUIT:
      return {
        ...state,
        isGameQuited: payload.isGameQuited,
      };
    default:
      return state;
  }
}
