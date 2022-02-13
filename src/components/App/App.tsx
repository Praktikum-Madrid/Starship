import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../config/Theme';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SugnUp/SignUp';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Game from '../Game/Game';
import Leaderboard from '../Leaderboard/Leaderboard';
import Forum from '../Forum/Forum';
import Page404 from '../Page404/Page404';
import Page500 from '../Page500/Page500';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='profile' element={<Profile />} />
          <Route path='game' element={<Game />} />
          <Route path='leaderboard' element={<Leaderboard />} />
          <Route path='forum' element={<Forum />} />
          <Route path='server-error' element={<Page500 />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
