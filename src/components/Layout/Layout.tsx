import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import Header from '../Header';

export default function Layout() {
  const { isFullscreen, isGameStarted } = useSelector((state: RootState) => state.game);

  return (
    <>
      { !isFullscreen && <Header /> }

      <div className='content' style={isFullscreen || isGameStarted ? { backgroundColor: 'black' } : {}}>
        <Outlet />
      </div>
    </>
  );
}
