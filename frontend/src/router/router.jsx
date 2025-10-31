import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Pages (ajusta los nombres si usan otro)
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Dashboard from "../pages/Dashboard"; 

function ScrollToTop() {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Pública */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>

        {/* Privada */}
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
