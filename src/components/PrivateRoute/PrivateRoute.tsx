/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component, ...props }) => {
  const { isLogined } = useSelector((state: RootState) => state.auth);

  if (isLogined) return <Component {...props} />;
  return <Navigate to='/signin' />;
};

export default PrivateRoute;
