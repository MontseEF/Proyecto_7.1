import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>No has iniciado sesión.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Perfil</h2>
      <h3>👋 Bienvenida, {user.name || user.email || "usuario"}!</h3>
      
      <p><strong>Nombre:</strong> {user.name || "No registrado"}</p>
      <p><strong>Email:</strong> {user.email || "No disponible"}</p>
    </div>
  );
}

