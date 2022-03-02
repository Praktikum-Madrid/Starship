import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

export default function Layout() {
  // TODO: добавить в стейт redux состояние isFullscreen
  const isFullscreen = false;

  return (
    <>
      { !isFullscreen ? <Header /> : '' }

      <div className='content' style={isFullscreen ? { backgroundColor: 'black' } : {}}>
        <Outlet />
      </div>
    </>
  );
}
