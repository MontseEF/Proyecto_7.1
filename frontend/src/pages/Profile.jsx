// src/pages/Profile.jsx
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      {user ? (
        <div className="space-y-2">
          <p><b>Nombre:</b> {user.name ?? "—"}</p>
          <p><b>Email:</b> {user.email ?? "—"}</p>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
