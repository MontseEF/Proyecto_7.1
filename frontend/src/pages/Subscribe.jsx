export default function Subscribe() {
  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Suscríbete</h1>
      <p className="mt-2 text-gray-600">Recibe ofertas y novedades.</p>
      <form className="mt-6 space-y-3">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Nombre" />
        <input className="w-full rounded-xl border px-3 py-2" type="email" placeholder="Email" />
        <button className="w-full rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
          Enviar
        </button>
      </form>
    </section>
  );
}
