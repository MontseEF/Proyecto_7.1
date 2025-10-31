import Products from "./Products.jsx";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-white py-14 border-b">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-800">Ferretería Zona Franca 🛠️</h1>
          <p className="text-slate-600 text-lg mt-2">
            Todo para tu proyecto — calidad y precios bajos 🔩
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Productos destacados</h2>
        <Products />
      </section>
    </div>
  );
}
