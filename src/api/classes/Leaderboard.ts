import Api from 'api/classes/Api';

export type TUserLeaderboard = {
  data: {
    avatar?: string,
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

class Leaderboard extends Api {
  private readonly _saveUserLeaderboardURL: string;

  private readonly _saveTeamLeaderboardURL: string;

  constructor({
    apiURL,
    addToLeaderboard,
    getTeamLeaderboard,
  }: Record<string, string>) {
    super(apiURL);
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

export default Leaderboard;
