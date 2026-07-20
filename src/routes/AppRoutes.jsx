import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Parent from "../pages/Parent";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound/>}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Parent />}>
          <Route index element={<Navigate to={"home"} replace />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
