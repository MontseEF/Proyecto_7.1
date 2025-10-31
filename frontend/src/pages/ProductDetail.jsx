import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { add } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.product(id);
        setP(data);
      } catch (e) {
        console.error(e);
        setErr("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (err) return <section className="max-w-6xl mx-auto px-4 py-10"><ErrorMessage>{err}</ErrorMessage></section>;
  if (!p) return null;

  const src = p.imageUrl?.startsWith("http") ? p.imageUrl : p.image || p.imageUrl || "/placeholder.png";
  const title = p.title || p.name || "Producto";
  const price = Number(p.price || 0);
  const stock = Number(p.stock ?? 0);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={src} alt={title} className="w-full h-80 object-cover rounded-2xl bg-slate-100" />
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {p.description ? <p className="mt-2 text-slate-600">{p.description}</p> : null}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-semibold">${price.toLocaleString("es-CL")}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${stock > 0 ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
            {stock > 0 ? `Stock: ${stock}` : "No disponible"}
          </span>
        </div>
        <button
          className="mt-4 rounded-xl px-4 py-2 font-medium bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => add({ id: p._id || p.id, title, price, imageUrl: src })}
          disabled={stock <= 0}
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
}
