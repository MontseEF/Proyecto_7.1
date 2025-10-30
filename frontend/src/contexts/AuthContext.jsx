/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data?.data?.user ?? null);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function login({ username, password }) {
    const { data } = await api.post("/auth/login", { username, password });
    const tk = data?.data?.token;
    if (tk) {
      localStorage.setItem("token", tk);
      setToken(tk);
      const me = await api.get("/auth/profile");
      setUser(me?.data?.data?.user ?? null);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
