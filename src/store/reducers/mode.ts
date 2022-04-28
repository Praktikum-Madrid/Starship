/* eslint-disable import/prefer-default-export */

import { ACTIONS } from 'store/actions/mode';
import { TModeSettings } from 'types';

const defaultState: TModeSettings = {
  mode: 'light',
  city: '',
  leader: [],
};

export function modeReducer(state: TModeSettings = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light',
      };
    case ACTIONS.SET_MODE:
      return {
        ...state,
        mode: payload.mode,
      };
    case ACTIONS.GEOLOCATION:
      return {
        ...state,
        city: payload.city,
      };
    case ACTIONS.GET_LEADER:
      return {
        ...state,
        leader: payload,
      };
    default:
      return state;
  }
}
