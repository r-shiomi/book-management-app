import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';

const UserRoute = props => {
  const isLoggedin = useSelector(state => state.userReducer.isLoggedin);

  return !isLoggedin ? <Redirect to="/login" /> : <Route {...props} />;
}

export default UserRoute;