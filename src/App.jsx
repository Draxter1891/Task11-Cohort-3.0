import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <div className="w-full min-h-screen bg-black">
      <AppRoutes setUsers={setUsers} users={users} />
    </div>
  );
};

export default App;
