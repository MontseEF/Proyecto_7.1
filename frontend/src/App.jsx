import React from "react";
import AppRouter from "./router/router";
import { AuthProvider } from "./contexts/AuthContext"; // si lo estás usando

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
