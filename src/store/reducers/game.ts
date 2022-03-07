import { TGameSettings } from 'types';

const ACTIONS = {
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
};

const defaultState: TGameSettings = {
  isFullscreen: false,
};

export function gameReducer(state: TGameSettings = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: !state.isFullscreen,
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
