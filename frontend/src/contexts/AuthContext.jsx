/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { api, setAuthToken } from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    console.log("🔐 AuthContext login iniciado con:", credentials);
    setLoading(true);
    try {
      console.log("📡 Haciendo petición a la API...");
      const { data } = await api.login(credentials);
      console.log("✅ Respuesta de la API:", data);
      
      setUser(data.user);
      setAuthToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      
      console.log("✅ Usuario guardado en contexto y localStorage");
      return data;
    } catch (error) {
      console.error("❌ Error en AuthContext login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.register(userData);
      setUser(data.user);
      setAuthToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Recuperar token del localStorage al inicializar
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
