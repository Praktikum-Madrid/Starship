import { leaderboard } from 'api/backend';
import { TReq, TRes, TUserLeaderboard } from 'types';

export const handleGetTeamLeaderboard = (req: TReq, res: TRes) => {
  const {
    ratingFieldName,
    cursor,
    limit,
  } = req.body;
  leaderboard.getTeamLeaderboard({
    ratingFieldName,
    cursor,
    limit,
  }, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};

export const handleAddUserToLeaderboard = (req: TReq, res: TRes) => {
  const {
    data: {
      avatar,
      rating,
      first_name,
      second_name,
    },
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

  leaderboard.addUserToLeaderboard(requestData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};
