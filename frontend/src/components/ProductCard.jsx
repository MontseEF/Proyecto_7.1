import { useCart } from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {
  const { add, inc, dec, qtyById } = useCart();

  const id = product.id || product._id || product.name; // fallback por estáticos
  const name = product.name || product.title || "Producto";
  const desc = product.description || product.desc || "";
  const price = Number(product.price || 0);
  const stock = Number(product.stock ?? 0) || 99; // estáticos sin stock: 99 por demo
  const img = product.img || product.image || product.imageUrl || "/placeholder.png";

  const qty = qtyById(id);
  const remaining = Math.max(0, stock - qty);

  return (
    <div className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition">
      {/* Imagen consistente */}
      <div className="h-48 w-full bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt={name}
          className="max-h-44 max-w-full object-contain"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />
      </div>

      <h3 className="mt-3 font-semibold text-slate-900">{name}</h3>
      {desc ? <p className="text-sm text-slate-600 mb-2 line-clamp-2">{desc}</p> : null}

      <div className="flex justify-between items-center text-sm mb-3">
        <span className="font-semibold text-slate-900">${price.toLocaleString("es-CL")}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${remaining > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {remaining > 0 ? `Stock: ${remaining}` : "Sin stock"}
        </span>
      </div>

      {/* Controles */}
      {qty > 0 ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => dec(id)}
            className="w-10 h-9 rounded-lg border text-slate-700 hover:bg-slate-50"
            aria-label="Quitar uno"
          >−</button>
          <div className="min-w-[3rem] text-center font-medium">{qty}</div>
          <button
            onClick={() => remaining > 0 && inc(id)}
            disabled={remaining <= 0}
            className={`w-10 h-9 rounded-lg border ${remaining > 0 ? "text-slate-700 hover:bg-slate-50" : "text-slate-400 cursor-not-allowed"}`}
            aria-label="Agregar uno"
          >+</button>
          <button
            onClick={() => remaining > 0 && inc(id)}
            disabled={remaining <= 0}
            className={`flex-1 h-9 rounded-lg text-white font-medium ${
              remaining > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Agregar
          </button>
        </div>
      ) : (
        <button
          onClick={() => add({ id, title: name, price, imageUrl: img, stock })}
          disabled={remaining <= 0}
          className={`w-full py-2 rounded-lg text-white font-medium ${
            remaining > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {remaining > 0 ? "Agregar al carrito" : "No disponible"}
        </button>
      )}
    </div>
  );
}
