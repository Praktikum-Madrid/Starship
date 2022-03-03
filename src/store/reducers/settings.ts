import { TUserInfo } from 'types';

const ACTIONS = {
  SAVE: 'SAVE',
  RESET: 'RESET',
};

type TProfileData = TUserInfo | {};

// eslint-disable-next-line import/prefer-default-export
export function settingsReducer(state: TProfileData = {}, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.SAVE:
      return {
        ...state,
        settings: payload,
      };
    case ACTIONS.RESET:
      return {
        ...state,
        settings: undefined,
      };
    default:
      return state;
  }
}

export function setUserSettings(payload: Record<string, any>) {
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
