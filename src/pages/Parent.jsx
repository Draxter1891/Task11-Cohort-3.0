import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useOutletContext } from "react-router";

const Parent = () => {
    const {currentUser} = useOutletContext();
  return (
    <div>
      <Navbar />
      <Outlet context={{currentUser}} />
    </div>
  );
};

export default Parent;
