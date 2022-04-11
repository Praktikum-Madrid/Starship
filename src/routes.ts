import { RouteObject } from 'react-router-dom';
import { PATH } from 'config/consts';
import Topic from 'components/Topic';
import SignIn from 'components/SignIn';
import SignUp from 'components/SugnUp';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Leaderboard from 'components/Leaderboard';
import Forum from 'components/Forum';
import Page404 from 'components/Page404';
import Page500 from 'components/Page500';
import GameStarship from 'components/GameStarship';

const routes: RouteObject[] = [
  {
    path: '/',
    element: Home,
  },
  {
    path: `${PATH.SIGN_IN}`,
    element: SignIn,
  },
  {
    path: `${PATH.SIGN_UP}`,
    element: SignUp,
  },
  {
    path: `${PATH.PROFILE}`,
    ...Profile,
  },
  {
    path: `${PATH.GAME}`,
    element: GameStarship,
  },
  {
    path: `${PATH.LEADERBOARD}`,
    ...Leaderboard,
  },
  {
    path: `${PATH.FORUM}`,
    element: Forum,
  },
  {
    path: `${PATH.FORUM_TOPIC_ID}`,
    element: Topic,
  },
  {
    path: `${PATH.SERVER_ERROR}`,
    element: Page500,
  },
  {
    path: '*',
    element: Page404,
  },
];

export default routes;
