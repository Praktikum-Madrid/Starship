/* eslint-disable import/prefer-default-export */
import { TPayload, TUserState } from 'types';
import { ACTIONS } from 'store/actions/auth';

const defaultState = {
  isLogined: false,
  signInError: '',
};

export function authReducer(state: TUserState = defaultState, { type, payload }: TPayload = {}) {
  switch (type) {
    // Авторизация
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogined: payload.isLogined,
        signInError: payload.error,
      };

    // Выход
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLogined: false,
      };

    // Регистрация
    case ACTIONS.REGISTER:
      return {
        ...state,
        isRegistered: payload.isRegistered,
        signUpError: payload.error,
      };

    default: return state;
  }
}
