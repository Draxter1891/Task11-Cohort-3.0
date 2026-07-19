import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router';
import { Auth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const {currentUser} = useContext(Auth);


  return currentUser?<Outlet/>:<Navigate to={"/login"} replace/>
}

export default ProtectedRoute;