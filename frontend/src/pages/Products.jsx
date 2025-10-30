import { useEffect, useState } from "react";

export default function Products() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        setItems(json.data || json);
      } catch (error) {
        console.error(error);
        setErr("No se pudo cargar el catálogo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando catálogo…</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <article key={p._id || p.id} className="border rounded-lg p-4 shadow-sm">
            {/* Si subiste imágenes al /public, usa p.image como '/archivo.ext' */}
            <img
              src={p.image || "/martillo.jpg"}
              alt={p.name}
              className="h-40 w-full object-contain mb-3"
              loading="lazy"
            />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.brand}</p>
            <p className="mt-2 font-bold">${Number(p.price || 0).toLocaleString("es-CL")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
