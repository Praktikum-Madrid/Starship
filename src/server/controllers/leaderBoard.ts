/* eslint-disable camelcase */
import { leaderboard } from 'api/backend';
import { TReq, TRes, TUserLeaderboard } from 'types';

const __DATA__ = {
  ratingFieldName: 'rating',
  cursor: 0,
  limit: 5,
};

export const handleGetTeamLeaderboard = (req: TReq, res: TRes) => {
  leaderboard
    .getTeamLeaderboard(
      __DATA__,
      req.headers.cookie,
    )
    .then((apiResponse) => {
      res.status(apiResponse.status).send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
};

export const handleAddUserToLeaderboard = (req: TReq, res: TRes) => {
  const {
    data: { avatar, rating, first_name, second_name },
    ratingFieldName,
    teamName,
  } = req.body;

  const requestData: TUserLeaderboard = {
    data: {
      rating,
      first_name,
      second_name,
    },
    ratingFieldName,
    teamName,
  };

  if (avatar) {
    requestData.data.avatar = avatar;
  }

  leaderboard
    .addUserToLeaderboard(requestData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status).send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
};
