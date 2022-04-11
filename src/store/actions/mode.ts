/* eslint-disable import/prefer-default-export */

import { getTeamLeaderboard, toggleTheme } from 'config/api';

export const ACTIONS = {
  TOGGLE_MODE: 'TOGGLE_MODE',
  SET_MODE: 'SET_MODE',
  GEOLOCATION: 'GEOLOCATION',
  GET_LEADER: 'GET_LEADER',
};

const __DATA__ = {
  ratingFieldName: 'rating',
  cursor: 0,
  limit: 5,
};

export function setGeolocation(payload: Record<string, any>) {
  return {
    type: ACTIONS.GEOLOCATION,
    payload,
  };
}

// сохраняет тему на сервере при ее изменении на клиенте
export const toggleColorTheme = (userId: number, theme: string) => async (dispatch: any, getState: any, axiosInstance: any) => {
  console.log(userId, theme);
  const res = await axiosInstance.put(toggleTheme, { userId, theme }, {
    withCredentials: true,
  });
  console.log(res);

  dispatch({
    type: ACTIONS.TOGGLE_MODE,
  });
};

export const getLeader = () => async (dispatch: any, getState: any, axiosInstance: any) => {
  const res = await axiosInstance.post(getTeamLeaderboard, __DATA__, {
    withCredentials: true,
  });

  dispatch({
    type: ACTIONS.GET_LEADER,
    payload: res.data,
  });
};
