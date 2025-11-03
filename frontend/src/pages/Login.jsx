import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";


export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    
    console.log("🚀 Formulario enviado con:", { email, password });
    console.log("🔍 Función login del contexto:", login);
    
    try {
      const result = await login({ email, password });
      console.log("✅ Login exitoso desde contexto:", result);
      console.log("🔄 Navegando a la página principal...");
      nav("/");
      console.log("✅ Navegación ejecutada");
    } catch (e) {
      console.error("❌ Error en login desde contexto:", e);
      setErr(e?.response?.data?.message || e?.message || "Error de inicio de sesión");
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
      


      <ErrorMessage>{err}</ErrorMessage>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="w-full border rounded-lg px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input className="w-full border rounded-lg px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button disabled={loading} className="w-full rounded-xl py-2 font-medium bg-blue-600 text-white hover:bg-blue-700">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {loading && <LoadingSpinner />}
      <p className="text-sm mt-4">
        ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
      </p>
    </section>
  );
}
