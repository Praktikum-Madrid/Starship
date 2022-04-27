import { PATH } from 'config/consts';
import Topic from 'components/Topic';
import SignIn from 'components/SignIn';
import SignUp from 'components/SugnUp';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Leaderboard from 'components/Leaderboard';
import Forum from 'components/Forum';
import Page500 from 'components/Page500';
import GameStarship from 'components/GameStarship';
import { IRouteObjectWithPrivacy } from 'types';

const routes: IRouteObjectWithPrivacy[] = [
  {
    path: '/',
    element: Home,
    isPrivate: false,
  },
  {
    path: `${PATH.SIGN_IN}`,
    element: SignIn,
    isPrivate: false,
  },
  {
    path: `${PATH.SIGN_UP}`,
    element: SignUp,
    isPrivate: false,
  },
  {
    path: `${PATH.PROFILE}`,
    ...Profile,
    isPrivate: true,
  },
  {
    path: `${PATH.GAME}`,
    element: GameStarship,
    isPrivate: true,
  },
  {
    path: `${PATH.LEADERBOARD}`,
    ...Leaderboard,
    isPrivate: true,
  },
  {
    path: `${PATH.FORUM}`,
    ...Forum,
    isPrivate: true,
  },
  {
    path: `${PATH.FORUM_TOPIC_ID}`,
    ...Topic,
    isPrivate: true,
  },
  {
    path: `${PATH.SERVER_ERROR}`,
    element: Page500,
    isPrivate: true,
  },
];

export default routes;
