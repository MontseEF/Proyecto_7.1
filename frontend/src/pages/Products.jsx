import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { Link } from "react-router-dom";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.products();
        setItems(data);
      } catch (e) {
        console.error(e);
        setErr("No se pudo cargar el catálogo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Productos</h1>
      <ErrorMessage>{err}</ErrorMessage>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((p) => (
          <Link key={p._id || p.id} to={`/productos/${p._id || p.id}`} className="block">
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </section>
  );
}
