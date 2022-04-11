import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import {
  checkOAuthYandex,
  isAuth,
} from 'store/actions/auth';
import { setGeolocation } from 'store/actions/mode';
import { COORDINATES } from 'utils/geolocation';
import Container from '@mui/material/Container';
import HeaderWithMenu from '../Header';

const Layout = () => {
  const dispatch = useDispatch();
  const { isFullscreen, isGameStarted } = useSelector((state: RootState) => state.game);

  React.useEffect(() => {
    dispatch(checkOAuthYandex());
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
};

function loadData(store: any) {
  return store.dispatch(isAuth());
}

export default {
  element: Layout,
  loadData,
};
