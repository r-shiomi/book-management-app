import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = props => {
  const isLoggedin = useSelector(state => state.userReducer.isLoggedin);
  
  return isLoggedin ? <Redirect to="/" /> : <Route {...props} />;
}

export default GuestRoute;