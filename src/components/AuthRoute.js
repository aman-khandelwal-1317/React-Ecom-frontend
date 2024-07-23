import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../actions/userActions';

const AuthRoute = ({ children }) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return !userInfo ? <Navigate to="/login" /> : children;
};

export default AuthRoute;
