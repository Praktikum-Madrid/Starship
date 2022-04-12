/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { getTeamLeaderboard } from 'config/api';

export const ACTIONS = {
  TOGGLE_MODE: 'TOGGLE_MODE',
  GEOLOCATION: 'GEOLOCATION',
  GET_LEADER: 'GET_LEADER',
  SET_MODE: 'SET_MODE',
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

export const getLeader = () => async (dispatch: any, getState: any, axiosInstance: any) => {
  const res = await axiosInstance.post(getTeamLeaderboard, __DATA__, {
    withCredentials: true,
  });

  dispatch({
    type: ACTIONS.GET_LEADER,
    payload: res.data,
  });
};

// сохраняет тему на сервере при ее изменении на клиенте
export const toggleColorTheme = (userId: number, theme: string) => async (dispatch: any, getState: any, axiosInstance: any) => {
  const data = {
    userId: `${userId}`,
    theme,
  };
  const state = getState();
  if (state.auth.isLogined) {
    const res = await axios.post('http://localhost:8080/user/theme', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
  }

  dispatch({
    type: ACTIONS.TOGGLE_MODE,
  });
};
