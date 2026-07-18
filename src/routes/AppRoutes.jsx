import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = ({setUsers, users}) => {
  return (
    <Routes>
      <Route path="/" element={<Login users={users}/>} />
      <Route path="/signup" element={<Signup setUsers={setUsers} users={users}/>} />
      <Route element={<ProtectedRoute/>}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
