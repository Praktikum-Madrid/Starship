import * as settings from 'config/proxy';

import AuthApi from './classes/Auth';
import Leaderboard from './classes/Leaderboard';
import ProfileApi from './classes/Profile';

export const auth = new AuthApi(settings);
export const leaderboard = new Leaderboard(settings);
export const profile = new ProfileApi(settings);
