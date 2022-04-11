/* eslint-disable import/prefer-default-export */

import { getUser } from 'config/api';

export const ACTIONS = {
  GET_USER: 'GET_USER',
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

export const getUserProfile = () => async (dispatch: any, getState: any, axiosInstance: any) => {
  const res = await axiosInstance.get(getUser, {}, {
    withCredentials: true,
  });

  dispatch({
    type: ACTIONS.GET_USER,
    payload: res.data,
  });
};
