import { useCart } from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {
  const { add } = useCart();

  const img = product.img || product.image || product.imageUrl;

  return (
    <div className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition">
      <img
        src={img}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="mt-3 font-semibold text-slate-900">{product.name}</h3>

      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center text-sm mb-3">
        <span className="font-semibold text-slate-900">${product.price.toLocaleString()}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
        </span>
      </div>

      <button
        disabled={product.stock <= 0}
        onClick={() => add(product)}
        className={`w-full py-2 rounded-lg text-white font-medium ${
          product.stock > 0
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {product.stock > 0 ? "Agregar al carrito" : "No disponible"}
      </button>
    </div>
  );
}
