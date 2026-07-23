import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthContext } from "./context/AuthContext.jsx";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { ProductContext } from "./context/ProductContext.jsx";
import { CartContext } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <ProductContext>
        <CartContext>
          <App />
          <ToastContainer transition={Zoom} autoClose={1000} />
        </CartContext>
      </ProductContext>
    </AuthContext>
  </BrowserRouter>,
);
