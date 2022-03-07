import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import Header from '../Header';

export default function Layout() {
  const { isFullscreen, isGame } = useSelector((state: RootState) => state.game);

  return (
    <>
      { !isFullscreen && <Header /> }

      <div className='content' style={isFullscreen || isGame ? { backgroundColor: 'black' } : {}}>
        <Outlet />
      </div>
    </>
  );
}
