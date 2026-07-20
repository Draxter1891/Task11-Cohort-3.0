import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthContext } from "./context/AuthContext.jsx";
import { ToastContainer, Zoom, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <App />
      <ToastContainer transition={Zoom} autoClose={1000} limit={1}/>
    </AuthContext>
  </BrowserRouter>,
);
