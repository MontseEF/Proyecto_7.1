import { useCart } from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const src = product.imageUrl?.startsWith("http")
    ? product.imageUrl
    : product.image || product.imageUrl || "/placeholder.png";

  const id = product._id || product.id;
  const title = product.title || product.name || "Producto";
  const price = Number(product.price || 0);
  const stock = Number(product.stock ?? 0);

  return (
    <article className="rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
      <img
        src={src}
        alt={title}
        className="w-full h-44 object-cover rounded-xl bg-slate-100"
        onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
      />
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      {product.description ? (
        <p className="text-sm text-slate-600 min-h-10">{product.description}</p>
      ) : null}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-semibold">${price.toLocaleString("es-CL")}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${stock > 0 ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
          {stock > 0 ? `Stock: ${stock}` : "No disponible"}
        </span>
      </div>
      <button
        disabled={stock <= 0}
        onClick={() => add({ id, title, price, imageUrl: src })}
        className={`mt-3 w-full rounded-xl py-2 font-medium ${stock > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
      >
        {stock > 0 ? "Agregar al carrito" : "Sin stock"}
      </button>
    </article>
  );
}
