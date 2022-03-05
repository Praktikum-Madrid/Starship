const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

type UserState = {
  isLogined: boolean
}

const defaultState = {
  isLogined: false,
};

export function authReducer(state: UserState = defaultState, { type }: Record<string, string> = {}) {
  switch (type) {
    // Авторизация
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogined: true,
      };

    // Выход
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLogined: false,
      };

    default: return state;
  }
}

export function logIn() {
  return { type: ACTIONS.LOGIN };
}

export function logOut() {
  return { type: ACTIONS.LOGOUT };
}
