import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../actions/userActions';

const PrivateRoute = ({ children }) => {

  useEffect(() => {

  },[])
  // const dispatch = useDispatch();
  // dispatch(getUserInfo())

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  return userInfo ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
