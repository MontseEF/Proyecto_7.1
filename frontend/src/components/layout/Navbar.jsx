import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth"; // tu hook
// el logo está directamente en /public
const logo = "/logo.jpeg";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-brand-700 text-white shadow">
      <nav className="mx-auto max-w-7xl px-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* brand un pelito a la izquierda */}
          <Link to="/" className="flex items-center gap-2 -ml-1">
            <img src={logo} alt="Ferretería Zona Franca" className="h-8 w-8 rounded" />
            <span className="text-lg font-semibold">Ferretería Zona Franca</span>
          </Link>

          <ul className="flex items-center gap-6 text-sm">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : "hover:underline"
                }
              >
                Inicio
              </NavLink>
            </li>

            {/* onepage + ruta directa */}
            <li>
              <a href="/#productos" className="hover:underline">Productos</a>
            </li>

            {user ? (
              <>
                <li className="text-sm opacity-90">
                  Hola, {user.username || "usuario"}
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="rounded-xl bg-white/15 px-3 py-1.5 text-sm hover:bg-white/25"
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "underline font-semibold"
                      : "rounded-xl bg-white/10 px-3 py-1.5 hover:bg-white/20"
                  }
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

