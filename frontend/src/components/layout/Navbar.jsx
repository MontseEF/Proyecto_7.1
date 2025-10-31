import { Outlet, Link, NavLink } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* NAV */}
      <header className="bg-white border-b shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="Ferretería Zona Franca" className="h-10 w-auto rounded-md"/>
            <span className="font-bold text-lg text-slate-800">Ferretería Zona Franca</span>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium">
            <NavLink to="/" className="hover:text-blue-600">Inicio</NavLink>
            <NavLink to="/cart" className="hover:text-blue-600">Carrito</NavLink>
            <NavLink to="/login" className="hover:text-blue-600">Ingresar</NavLink>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Ferretería Zona Franca — Herramientas & Construcción
      </footer>
    </div>
  );
}
