import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { TCredintials } from 'types';
import Auth from 'api/Auth';
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
import { logIn } from 'store/reducers/auth';
import { setUserSettings } from 'store/reducers/settings';
import PrivateRoute from 'components/PrivateRoute';

export default function App() {
  const dispatch = useDispatch();

  // Стейт о состоянии регистрации (успех/провал?)
  const [signUpState, setSignUpState] = useState({});

  // Если настройки юзера сохранены, используем их
  useEffect(() => {
    try {
      const settings = localStorage.getItem('settings');

      if (settings) {
        // FIXME: Писать настройки юзера в стор из локалстораджа
        dispatch(setUserSettings(JSON.parse(settings)));
        dispatch(logIn());
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // FIXME: Перенести в компонент регистрации
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
          setSignUpState({
            error: 'Пользователь с таким имейлом уже существует',
          });
        }

        return response.json();
      })
      .then((parsedResponse) => {
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
          <Route index element={<PrivateRoute component={Home} />} />
          <Route path='signin' element={<SignIn />} />
          <Route
            path='signup'
            element={
              <SignUp handleSignUp={handleSignUp} signUpState={signUpState} />
            }
          />
          <Route
            path='profile'
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path='game'
            element={<PrivateRoute component={GameStarship} />}
          />
          <Route
            path='leaderboard'
            element={<PrivateRoute component={Leaderboard} />}
          />
          <Route
            path='forum'
            element={<PrivateRoute component={Forum} />}
          />
          <Route
            path='forum/:topicId'
            element={<PrivateRoute component={Topic} />}
          />
          <Route path='server-error' element={<Page500 />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
