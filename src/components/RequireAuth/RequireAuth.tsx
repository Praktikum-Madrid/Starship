import { PATH } from 'config/consts';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from 'store/reducers';

function RequireAuth() {
  const { isLogined } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isLogined) {
    return <Navigate to={PATH.SIGN_IN} state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
