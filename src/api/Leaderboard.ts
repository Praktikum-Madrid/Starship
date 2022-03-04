import {
  addToLeaderboard,
  getTeamLeaderboard,
} from 'config/api';
import Api from 'api/Api';

export type TUserLeaderboard = {
  data: {
    avatar: string,
    rating: number,
    first_name: string,
    second_name: string,
  },
  ratingFieldName: string,
  teamName: string,
}

export type TTeamLeaderboard = {
  ratingFieldName: string,
  cursor: number,
  limit: number
}
// @TODO перенести центральное место

class LeaderboardAPI extends Api {
  private readonly _saveUserLeaderboardURL: string;

  private readonly _saveTeamLeaderboardURL: string;

  constructor() {
    super();
    this._saveUserLeaderboardURL = this.apiUrl + addToLeaderboard;
    this._saveTeamLeaderboardURL = this.apiUrl + getTeamLeaderboard;
  }

  addUserToLeaderboard(data: TUserLeaderboard) {
    return this.post(this._saveUserLeaderboardURL, data);
  }

  getTeamLeaderboard(data: TTeamLeaderboard) {
    return this.post(this._saveTeamLeaderboardURL, data);
  }
}

export default new LeaderboardAPI();
