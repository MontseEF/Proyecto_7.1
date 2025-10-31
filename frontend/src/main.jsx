import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppRouter from "./router/router.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
