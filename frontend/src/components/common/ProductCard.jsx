import { useCart } from "../../contexts/CartContext";

export default function ProductCard({ product, onAdd }) {
  const { add } = useCart();
  const { name, price, description, stock, img } = product;

  // normaliza el producto para el carrito
  const normalized = {
    ...product,
    _id: product._id ?? product.id ?? product.slug ?? name, 
    price: Number(price || 0),
    qty: product.qty ?? 1,
  };

  const handleAdd = () => (onAdd ?? add)(normalized);      

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-50">
        <img src={img || "/logo.jpeg"} alt={name} className="h-full w-full object-contain p-4" />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold">{name}</h3>
        <p className="line-clamp-2 text-sm opacity-80">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold">
            {typeof price === "number" ? `$${price.toLocaleString("es-CL")}` : "-"}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${stock>0?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
            {stock>0 ? "En stock" : "Sin stock"}
          </span>
        </div>
        <button
          onClick={handleAdd}
          disabled={stock <= 0}
          className="mt-2 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Agregar al carro
        </button>
      </div>
    </div>
  );
}
