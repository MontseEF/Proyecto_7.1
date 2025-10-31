import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar simple. Si ya tienes Sidebar.jsx, reemplaza este bloque por tu componente */}
      <aside className="col-span-3 md:col-span-2 border-r bg-white">
        <div className="p-4 font-bold">Panel</div>
        <nav className="flex flex-col gap-2 px-4 pb-4 text-sm">
          <Link to="/panel">Dashboard</Link>
          <Link to="/panel/productos">Productos</Link>
          <Link to="/panel/ordenes">Órdenes</Link>
          <Link to="/">Volver a tienda</Link>
        </nav>
      </aside>

      <section className="col-span-9 md:col-span-10 p-4">
        <Outlet />
      </section>
    </div>
  );
}
