import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import Auth from 'api/Auth';
import { signIn } from 'store/actions/auth';
// TODO: вынести action в раздел actions/settings
import { setUserSettings } from 'store/reducers/settings';
import Header from '../Header';

export default function Layout() {
  const dispatch = useDispatch();
  const { isFullscreen, isGameStarted } = useSelector((state: RootState) => state.game);
  React.useEffect(() => {
    Auth.getUserData()
      .then((response) => {
        if (response.status === 200) {
          dispatch(signIn({
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

  return (
    <>
      { !isFullscreen && <Header /> }

      <div className='content' style={isFullscreen || isGameStarted ? { backgroundColor: 'black' } : {}}>
        <Outlet />
      </div>
    </>
  );
}
