import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";

// Pages
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Cart from "../pages/Cart.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICAS */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>

        {/* RUTA PROTEGIDA – TEMPORALMENTE SOLO MUESTRA CART */}
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
