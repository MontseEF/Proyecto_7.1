import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7.16 14h9.95a2 2 0 0 0 1.94-1.515l1.68-6.72A1 1 0 0 0 19.76 4H6.21l-.3-1.2A2 2 0 0 0 4 1H2v2h2l3.6 14.4A2 2 0 0 0 9.5 19H19v-2H9.5l-.34-1.36L7.16 14Z"/>
    </svg>
  );
}

// Íconos limpios
const Icon = {
  Facebook: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07A10.07 10.07 0 1 0 10.93 22V14.3H8.08v-2.9h2.85V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.45v1.75h2.59l-.41 2.9h-2.18V22A10.07 10.07 0 0 0 22 12.07Z"/></svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m6.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
  ),
  Tiktok: () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor"><path d="M41,14.5a15.5,15.5,0,0,1-9.26-3.09V32.51a8.71,8.71,0,1,1-8.71-8.71,8.5,8.5,0,0,1,2.21.29V19.06a15.49,15.49,0,1,0,6.5,12.69V10.57A21,21,0,0,0,41,14.5Z"/></svg>
  ),
};

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-amber-700/20 text-white" : "text-white/90 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* NAVBAR (ocre) */}
      <header className="bg-amber-600 sticky top-0 z-10 shadow">
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Ferretería Zona Franca" className="h-10 w-auto rounded-md bg-white/90 p-1" />
              <span className="font-bold text-white text-lg">Ferretería Zona Franca</span>
            </Link>

            {/* Orden: Inicio, Productos, Carrito, Ingresar */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={linkClass}>Inicio</NavLink>
              <NavLink to="/productos" className={linkClass}>Productos</NavLink>
              <NavLink to="/cart" className={linkClass}>
                <span className="flex items-center gap-2"><CartIcon /> Carrito</span>
              </NavLink>
              <NavLink to="/login" className={linkClass}>Ingresar</NavLink>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-700/30"
              aria-label="Abrir menú"
              onClick={() => setOpen(!open)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {open && (
            <div className="md:hidden pb-3">
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Inicio</NavLink>
              <NavLink to="/productos" className={linkClass} onClick={() => setOpen(false)}>Productos</NavLink>
              <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
                <span className="flex items-center gap-2"><CartIcon /> Carrito</span>
              </NavLink>
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Ingresar</NavLink>
            </div>
          )}
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER azulado con suscripción + info */}
      <footer className="bg-sky-900 text-sky-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
          {/* Suscripción */}
          <div>
            <h4 className="font-semibold text-white mb-2">Suscríbete</h4>
            <p className="text-sm text-sky-200 mb-3">Ofertas y novedades para tus proyectos.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.cl"
                className="flex-1 px-3 py-2 rounded-md bg-white/95 text-slate-800 placeholder:slate-400 focus:outline-none"
              />
              <button type="button" className="px-3 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium">
                Enviar
              </button>
            </form>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-2">Contacto</h4>
            <ul className="text-sm text-sky-200 space-y-1">
              <li>📞 +56 9 1234 5678</li>
              <li>✉️ contacto@ferreteriazonafranca.cl</li>
              <li>📍 Av. Principal 123, Santiago</li>
            </ul>
          </div>

          {/* Horarios + Redes */}
          <div>
            <h4 className="font-semibold text-white mb-2">Horarios</h4>
            <ul className="text-sm text-sky-200 space-y-1 mb-3">
              <li>Lun a Vie: 09:00 – 19:00</li>
              <li>Sáb: 10:00 – 14:00</li>
              <li>Domingo: Cerrado</li>
            </ul>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Icon.Facebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Icon.Instagram /></a>
              <a href="#" aria-label="TikTok" className="hover:text-white"><Icon.Tiktok /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-800">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-sky-200">
            © {new Date().getFullYear()} Ferretería Zona Franca — Herramientas & Construcción
          </div>
        </div>
      </footer>
    </div>
  );
}

