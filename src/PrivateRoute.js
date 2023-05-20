import React from 'react';
import { Navigate, Route } from 'react-router-dom';


const PrivateRoute = ({ isLoggedIn, element: Element, ...rest }) => {
    return (
      <Route {...rest} element={isLoggedIn ? <Element /> : <Navigate to="/login" />} />
    );
  };
  
export default PrivateRoute;