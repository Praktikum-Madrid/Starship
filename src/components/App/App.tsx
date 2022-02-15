import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { TCredintials } from 'types';
import Auth from 'api/Auth';
import theme from 'config/Theme';
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
  // Стейт для хранения настроек юзера
  const [userSettings, setUserSettings] = useState({});

  // Стейт о состоянии авторизации (успех/провал?)
  const [signInState, setSignInState] = useState({});

  // Стейт о состоянии регистрации (успех/провал?)
  const [signUpState, setSignUpState] = useState({});

  // Если настройки юзера сохранены, используем их
  useEffect(() => {
    const settings = localStorage.getItem('settings');

    if (settings) {
      setUserSettings(JSON.parse(settings));
    }
  }, []);

  // Обрабатываем авторизацию
  const handleLogin = (loginData: TCredintials) => {
    // Авторизуемся
    Auth.signIn(loginData)
      .then((response) => {
        setSignInState({});

        if (response.ok && response.status === 200) {
          setUserSettings({ authorised: true });
          return;
        }

        if (response.status === 400) {
          // FIXME: если юзер авторизован, он не должен попадать на эту страницу
          Auth.logOut();
          setSignInState({ error: 'Юзер уже авторизован' });
          throw new Error('Юзер уже авторизован');
        }

        if (response.status === 401) {
          setSignInState({ error: 'Неверные имя пользователя или пароль' });
          throw new Error('Неверные имя пользователя или пароль');
        }
      }).then(() => Auth.getUserData().then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        }

        setSignInState({ error: 'Ошибка при получении данных пользователя' });
      }).then((userData) => {
        localStorage.setItem('settings', JSON.stringify(userData));
        setUserSettings(userData);
      }))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = (signUpData: TCredintials) => {
    // Авторизуемся
    Auth.signUp(signUpData)
      .then((response) => {
        if (response.ok && response.status === 200) {
          setSignUpState({ registered: true });
        }

        if (response.status === 400) {
          // FIXME: Авторизованый юзер не должен попадать в этот роут
          Auth.logOut();
          setSignUpState({ error: 'Ошибка при создании пользователя' });
        }

        if (response.status === 409) {
          setSignUpState({ error: 'Пользователь с таким имейлом уже существует' });
        }

        return response.json();
      }).then((parsedResponse) => {
        console.log(parsedResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn handleLogin={handleLogin} signInState={signInState} userSettings={userSettings}/>} />
          <Route path='signup' element={<SignUp handleSignUp={handleSignUp} signUpState={signUpState}/>} />
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
