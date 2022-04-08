/* eslint-disable import/prefer-default-export */
// FIXME: WTF IS THIS??? Надо либо все экшены вынести в эту директорию,
//  либо сложить эти экшены в соответствующие редьесеры. Это дублирование кода.
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
