import React from 'react'
import { Outlet, Navigate } from 'react-router';
const ProtectedRoute = () => {
    let currentUser = (localStorage.getItem("currentUser"));


  return currentUser?<Outlet/>:<Navigate to={"/"} replace/>
}

export default ProtectedRoute;