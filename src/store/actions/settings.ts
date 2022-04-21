/* eslint-disable import/prefer-default-export */
import { getUser } from 'config/api';
import { profile } from 'api/frontend';
import { AxiosResponse } from 'axios';

export const ACTIONS = {
  GET_USER: 'GET_USER',
  GET_USER_ID_DB: 'GET_USER_ID_DB',
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

  if (!res.data.display_name) {
    res.data.display_name = '';
  }

  dispatch({
    type: ACTIONS.GET_USER,
    payload: res.data,
  });

  await getUserIdDB()(dispatch, getState);
};

export const getUserIdDB = () => async (dispatch: any, getState: any) => {
  const state = getState();
  const userId = state.settings.id;
  await profile
    .getUserIdDB(userId)
    .then((response: AxiosResponse) => {
      dispatch({
        type: ACTIONS.GET_USER_ID_DB,
        payload: {
          userIdDB: response.data.id,
        },
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};
