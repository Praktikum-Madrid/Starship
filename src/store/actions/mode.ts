/* eslint-disable import/prefer-default-export */

// import { getTeamLeaderboard } from 'config/api';
import { leaderboard } from 'api/frontend';

export const ACTIONS = {
  TOGGLE_MODE: 'TOGGLE_MODE',
  GEOLOCATION: 'GEOLOCATION',
  GET_LEADER: 'GET_LEADER',
};

const __DATA__ = {
  ratingFieldName: 'rating',
  cursor: 0,
  limit: 5,
};

export function toggleColorTheme() {
  return {
    type: ACTIONS.TOGGLE_MODE,
  };
}

export function setGeolocation(payload: Record<string, any>) {
  return {
    type: ACTIONS.GEOLOCATION,
    payload,
  };
}

export const getLeader = () => async (dispatch: any) => {
  // const res = await axiosInstance.post(getTeamLeaderboard, __DATA__, {
  //   withCredentials: true,
  // });

  leaderboard.getTeamLeaderboard(__DATA__).then((response) => {
    dispatch({
      type: ACTIONS.GET_LEADER,
      payload: response.data,
    });
  });
};
