import Api from 'api/classes/Api';
import { TUserLeaderboard, TTeamLeaderboard } from 'types';

class Leaderboard extends Api {
  private readonly _saveUserLeaderboardURL: string;

  private readonly _saveTeamLeaderboardURL: string;

  static addUserToLeaderboard: any;

  constructor({
    apiURL,
    addToLeaderboard,
    getTeamLeaderboard,
  }: Record<string, string>) {
    super(apiURL);
    this._saveUserLeaderboardURL = this.apiUrl + addToLeaderboard;
    this._saveTeamLeaderboardURL = this.apiUrl + getTeamLeaderboard;
  }

  addUserToLeaderboard(data: TUserLeaderboard, cookie?: string) {
    return this.post(this._saveUserLeaderboardURL, data, cookie);
  }

  getTeamLeaderboard(data: TTeamLeaderboard, cookie?: string) {
    return this.post(this._saveTeamLeaderboardURL, data, cookie);
  }
}

export default Leaderboard;
