/* eslint-disable import/prefer-default-export */

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export function signInActions(payload: Record<string, any>) {
  return {
    type: ACTIONS.LOGIN,
    payload,
  };
}

export function logOutActions() {
  return {
    type: ACTIONS.LOGOUT,
  };
}
