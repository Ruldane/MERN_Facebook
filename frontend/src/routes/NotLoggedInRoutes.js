import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/login';

export default function NotLoggedInRoutes() {
  const { user } = useSelector((user) => ({ ...user }));
  return user ? <Navigate to="/" /> : <Outlet />;
}
