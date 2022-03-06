import { PATH } from 'config/consts';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'store/reducers';

function RequireAuth() {
  const { isLogined } = useSelector((state: RootState) => state.auth);

  if (!isLogined) {
    return <Navigate to={PATH.SIGN_IN} />;
  }

  return <Outlet />;
}

export default RequireAuth;
