import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useOutletContext } from "react-router";

const Parent = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Parent;
