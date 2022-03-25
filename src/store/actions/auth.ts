/* eslint-disable import/prefer-default-export */

export const ACTIONS = {
  LOGIN: 'LOGIN',
};

export function signIn(payload: Record<string, any>) {
  return {
    type: ACTIONS.LOGIN,
    payload,
  };
}
