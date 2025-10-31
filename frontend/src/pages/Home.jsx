import Products from "./Products.jsx";

export default function Home() {
  return (
    <div>
      {/* HERO con gris tenue */}
      <section className="bg-slate-100 py-14 border-b">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Bienvenido a Ferretería Zona Franca
          </h1>
          <p className="text-lg mt-3">
            <span className="text-amber-700 font-semibold">
              La compañera de todos tus proyectos
            </span>
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Productos destacados</h2>
        <Products />
      </section>
    </div>
  );
}
