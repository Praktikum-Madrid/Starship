import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => (
  <>
    <Header />
    <div className='content'>
      <Outlet />
    </div>
  </>
);

export default Layout;
