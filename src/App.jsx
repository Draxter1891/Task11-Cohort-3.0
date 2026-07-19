import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <AppRoutes/>
    </div>
  );
};

export default App;
