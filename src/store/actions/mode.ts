/* eslint-disable import/prefer-default-export */

export const ACTIONS = {
  TOGGLE_MODE: 'TOGGLE_MODE',
};

export function toggleColorTheme() {
  return {
    type: ACTIONS.TOGGLE_MODE,
  };
}
