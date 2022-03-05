import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { setUserLogined } from 'store/reducers/auth';
import { setUserSettings } from 'store/reducers/settings';

export default function App() {
  const dispatch = useDispatch();

  // Если настройки юзера сохранены, используем их
  useEffect(() => {
    try {
      const settings = localStorage.getItem('settings');

      if (settings) {
        // FIXME: Писать настройки юзера в стор из локалстораджа
        dispatch(setUserSettings(JSON.parse(settings)));
        dispatch(setUserLogined());
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='profile' element={<Profile />} />
          <Route path='game' element={<GameStarship />} />
          <Route path='leaderboard' element={<Leaderboard />} />
          <Route path='forum' element={<Forum />} />
          <Route path='forum/:topicId' element={<Topic />} />
          <Route path='server-error' element={<Page500 />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
