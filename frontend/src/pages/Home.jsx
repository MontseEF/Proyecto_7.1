export default function Home() {
  return (
    <main id="home">
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-3xl font-bold">Bienvenida 👋</h1>
          <p className="mt-2 text-brand-100">
            Revisa el catálogo en <a href="/#productos" className="underline">Productos</a>.
          </p>
        </div>
      </section>

    
      <section id="contacto" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
        <p className="mt-2 text-gray-600">Escríbenos o visítanos en nuestra tienda.</p>
      </section>
    </main>
  );
}
