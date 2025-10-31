import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col gap-6">
      <div>
        <h2 className="font-bold text-lg text-brand-700">Panel</h2>
        <p className="text-sm text-gray-500">Bienvenido, {user?.name}</p>
      </div>

      <nav className="flex flex-col gap-3 text-sm">
        <NavLink
          to="/panel"
          className={({ isActive }) =>
            isActive ? "text-brand-700 font-semibold" : "text-gray-700"
          }
        >
          Resumen
        </NavLink>

        <NavLink
          to="/panel/profile"
          className={({ isActive }) =>
            isActive ? "text-brand-700 font-semibold" : "text-gray-700"
          }
        >
          Mi Perfil
        </NavLink>

        <NavLink
          to="/panel/orders"
          className={({ isActive }) =>
            isActive ? "text-brand-700 font-semibold" : "text-gray-700"
          }
        >
          Mis pedidos
        </NavLink>

    
      </nav>
    </aside>
  );
}
