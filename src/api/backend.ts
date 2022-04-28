import * as settings from 'config/api';

import AuthApi from './classes/Auth';
import Leaderboard from './classes/Leaderboard';
import ProfileApi from './classes/Profile';
import Avatar from './classes/Avatar';

export const auth = new AuthApi(settings);
export const leaderboard = new Leaderboard(settings);
export const profile = new ProfileApi(settings);
export const avatar = new Avatar(settings);
