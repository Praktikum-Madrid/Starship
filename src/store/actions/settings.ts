/* eslint-disable import/prefer-default-export */

export const ACTIONS = {
  SAVE: 'SAVE',
  RESET: 'RESET',
};

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
