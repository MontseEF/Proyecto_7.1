/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useMemo } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Carga inicial desde localStorage (tu lógica original)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Restaurar sesión al montar (si hay token o user guardado)
  useEffect(() => {
    (async () => {
      try {
        // Si ya hay user guardado, ya estamos
        if (user) return;

        // Si usas token, intenta /profile
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
              credentials: "include",
            }
          );

          if (res.ok) {
            const data = await res.json();
            const restored = data.user || data || null;
            if (restored) {
              setUser(restored);
              localStorage.setItem("user", JSON.stringify(restored));
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // ✅ Tu login “local” (recibe objeto user ya validado)
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    return { success: true, user: data, message: "Login exitoso" };
  };

  // ✅ Login contra backend (email/password) — usa token y luego /profile si es necesario
  const loginApi = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const message = (data && (data.message || data.error)) || "Error al iniciar sesión";
        return { success: false, message };
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Usa el user que venga en /login; si no, consulta /profile
      let nextUser = data?.user || null;

      if (!nextUser) {
        const token = localStorage.getItem("token");
        const meRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            credentials: "include",
          }
        );

        if (meRes.ok) {
          const meData = await meRes.json();
          nextUser = meData.user || meData || null;
        }
      }

      if (nextUser) {
        setUser(nextUser);
        localStorage.setItem("user", JSON.stringify(nextUser));
      }

      return { success: true, user: nextUser, message: "Login exitoso" };
    } catch (err) {
      return { success: false, message: err?.message || "Error de red" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = (data) => login(data); // mismo comportamiento que tenías

  const value = useMemo(
  () => ({
    user,
    loading,
    login,
    loginApi,
    logout,
    register,
    setUser,
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [user, loading]
);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
