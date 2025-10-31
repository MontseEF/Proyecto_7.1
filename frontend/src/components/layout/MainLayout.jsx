import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar simple. Si ya tienes uno, puedes reemplazar este bloque */}
      <header className="border-b bg-white">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">Ferretería</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/productos">Productos</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer simple */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Ferretería — Proyecto 7
        </div>
      </footer>
    </div>
  );
}
