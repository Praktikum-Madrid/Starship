/* eslint-disable import/prefer-default-export */

import { ACTIONS } from 'store/actions/mode';
import { TModeSettings } from 'types';

const defaultState: TModeSettings = {
  mode: 'light',
  city: '',
};

export function modeReducer(state: TModeSettings = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light',
      };
    case ACTIONS.GEOLOCATION:
      return {
        ...state,
        city: payload.city,
      };
    default:
      return state;
  }
}
