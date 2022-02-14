import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../config/Theme';
import Layout from '../Layout';
import SignIn from '../SignIn';
import SignUp from '../SugnUp';
import Home from '../Home';
import Profile from '../Profile';
import Game from '../Game';
import Leaderboard from '../Leaderboard';
import Forum from '../Forum';
import Page404 from '../Page404';
import Page500 from '../Page500';

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
