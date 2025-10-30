import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth.js";
;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-700 text-white shadow">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Logo" className="h-8 w-8 rounded" />
          <span className="text-xl font-bold">Ferretería Zona Franca</span>
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "underline font-semibold" : "hover:underline"}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={({isActive}) => isActive ? "underline font-semibold" : "hover:underline"}>
              Productos
            </NavLink>
          </li>

          {user ? (
            <>
              <li className="text-sm opacity-90">Hola, {user.username || "usuario"}</li>
              <li>
                <button onClick={logout} className="text-sm bg-white/15 hover:bg-white/25 px-3 py-1 rounded">
                  Salir
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={({isActive}) => isActive ? "underline font-semibold" : "hover:underline"}>
                Iniciar sesión
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
