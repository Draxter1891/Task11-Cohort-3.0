import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useOutletContext } from "react-router";
import Footer from "../components/Footer";

const Parent = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Parent;
