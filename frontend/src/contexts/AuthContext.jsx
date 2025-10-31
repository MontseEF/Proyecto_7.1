/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { api, setAuthToken } from "../services/api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // hidratar sesión
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const { token: tk, user: usr } = JSON.parse(saved);
      setUser(usr);
      setToken(tk);
      setAuthToken(tk);
    }
  }, []);

  const saveSession = useCallback((tk, usr) => {
    setUser(usr);
    setToken(tk);
    setAuthToken(tk);
    localStorage.setItem("auth", JSON.stringify({ token: tk, user: usr }));
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      saveSession(data.token, data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      saveSession(data.token, data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    setAuthToken(null);
    localStorage.removeItem("auth");
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

