import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const CreatorRoute = () => {
  const { user, status, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div>
      {status !== 'LOADING' &&
        (isAuthenticated && user?.role === 'creator' ? (
          <Outlet />
        ) : (
          <Navigate to={'/login'} />
        ))}
    </div>
  );
};

export default CreatorRoute;
