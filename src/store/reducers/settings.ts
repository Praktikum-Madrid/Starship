import { TUserInfo } from 'types';

const ACTIONS = {
  SAVE: 'SAVE',
  RESET: 'RESET',
};

type TProfileData = TUserInfo;

const defaultState: TProfileData = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  display_name: '',
  id: '',
};

// eslint-disable-next-line import/prefer-default-export
export function settingsReducer(state: TProfileData = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.SAVE:
      return {
        ...state,
        ...payload,
      };
    case ACTIONS.RESET:
      return {
        state: defaultState,
      };
    default:
      return state;
  }
}

export function setUserSettings(payload: Record<string, any>) {
  console.log(payload);
  return {
    type: ACTIONS.SAVE,
    payload,
  };
}

export function deleteUserSettings() {
  return {
    type: ACTIONS.RESET,
  };
}
