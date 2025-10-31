import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

export default function Register() {
  const { register: signup, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signup({ name, email, password });
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.message || "Error de registro");
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Crear cuenta</h1>
      <ErrorMessage>{err}</ErrorMessage>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input className="w-full border rounded-lg px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="w-full border rounded-lg px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input className="w-full border rounded-lg px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button disabled={loading} className="w-full rounded-xl py-2 font-medium bg-blue-600 text-white hover:bg-blue-700">
          {loading ? "Creando..." : "Registrarme"}
        </button>
      </form>
    </section>
  );
}
