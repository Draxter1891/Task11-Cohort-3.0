import React from 'react'
import { Outlet, Navigate } from 'react-router';
const ProtectedRoute = () => {
    let currentUser = (localStorage.getItem("currentUser"));


  return currentUser?<Outlet context={{currentUser}}/>:<Navigate to={"/login"} replace/>
}

export default ProtectedRoute;