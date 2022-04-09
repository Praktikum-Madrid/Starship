/* eslint-disable import/prefer-default-export */

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

export const getLeader = () => async (dispatch: any, getState: any, axiosInstance: any) => {
  const res = await axiosInstance.post('/leaderboard/all', __DATA__, {
    withCredentials: true,
  });

  dispatch({
    type: ACTIONS.GET_LEADER,
    payload: res.data,
  });
};
