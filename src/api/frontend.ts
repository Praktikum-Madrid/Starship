import * as settings from 'config/proxy';

import AuthApi from './classes/Auth';
import Leaderboard from './classes/Leaderboard';
import ProfileApi from './classes/Profile';
import ForumApi from './classes/Forum';

export const auth = new AuthApi(settings);
export const leaderboard = new Leaderboard(settings);
export const profile = new ProfileApi(settings);
export const forum = new ForumApi(settings);
