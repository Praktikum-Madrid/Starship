import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'config/Theme';
import Topic from 'components/Topic';
import Layout from 'components/Layout';
import SignIn from 'components/SignIn';
import SignUp from 'components/SugnUp';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Leaderboard from 'components/Leaderboard';
import Forum from 'components/Forum';
import Page404 from 'components/Page404';
import Page500 from 'components/Page500';
import GameStarship from 'components/GameStarship';
import { useSelector } from 'react-redux';
import { PATH } from 'config/consts';
import RequireAuth from 'components/RequireAuth';
import { RootState } from 'store/reducers';

export default function App() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogined } = useSelector((state: RootState) => state.auth);

  // Если настройки юзера сохранены, используем их
  useEffect(() => {
    if (!isLogined) {
      navigate(PATH.HOME);
    }
  }, [isLogined]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path={PATH.SIGN_IN} element={<SignIn />} />
          <Route path={PATH.SIGN_UP} element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.GAME} element={<GameStarship />} />
            <Route path={PATH.LEADERBOARD} element={<Leaderboard />} />
            <Route path={PATH.FORUM} element={<Forum />} />
            <Route path={PATH.FORUM_TOPIC_ID} element={<Topic />} />
          </Route>
          <Route path={PATH.SERVER_ERROR} element={<Page500 />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
