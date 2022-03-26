import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import Auth from 'api/Auth';
import { signInActions } from 'store/actions/auth';
// TODO: вынести action в раздел actions/settings
import { setUserSettings } from 'store/reducers/settings';
import { COORDINATES } from 'utils/geolocation';
import { setGeolocation } from 'store/actions/mode';
import Container from '@mui/material/Container';
import HeaderWithMenu from '../Header';

export default function Layout() {
  const dispatch = useDispatch();
  const { isFullscreen, isGameStarted } = useSelector((state: RootState) => state.game);
  React.useEffect(() => {
    Auth.getUserData()
      .then((response) => {
        if (response.status === 200) {
          dispatch(signInActions({
            isLogined: true,
            error: '',
          }));
          return response.data;
        }

        throw new Error('Ошибка при получении данных пользователя');
      })
      .then((userData) => {
        dispatch(setUserSettings(userData));
      })
      .catch((err) => console.log(err));
  }, []);

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const strLatitude = String(latitude).substring(0, 2);
    const strLongitude = String(longitude).substring(0, 2);

    COORDINATES.forEach((c) => {
      if (c.latitude === strLatitude && c.longitude === strLongitude) {
        dispatch(setGeolocation({ city: c.city }));
      }
    });
  };

  const error = () => {
    console.log('Не получилось получить информацию!');
  };

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation не поддерживается браузером!');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <>
      { !isFullscreen && <HeaderWithMenu /> }

      <Container
        maxWidth='xl'
        sx={{
          bgcolor: `${isFullscreen || isGameStarted ? 'black' : 'background.default'}`,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
