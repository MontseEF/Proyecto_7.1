import { useCart } from "../contexts/CartContext.jsx";
import CheckoutButton from "../components/CheckoutButton.jsx";

export default function Cart() {
  const { items, inc, dec, remove, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-3">Carrito</h1>
        <p className="text-slate-600">Tu carrito está vacío.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-5">Carrito</h1>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="bg-white border rounded-xl p-3 flex items-center gap-3">
            <img src={it.imageUrl} alt={it.title} className="w-16 h-16 object-contain bg-slate-100 rounded" />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-600">${it.price.toLocaleString("es-CL")}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => dec(it.id)} className="w-8 h-8 rounded-lg border">−</button>
              <div className="min-w-[2.5rem] text-center">{it.quantity}</div>
              <button onClick={() => inc(it.id)} className="w-8 h-8 rounded-lg border">+</button>
            </div>
            <button onClick={() => remove(it.id)} className="ml-2 text-red-600 hover:underline text-sm">Quitar</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: ${totalPrice().toLocaleString("es-CL")}</div>
        <CheckoutButton />
      </div>
    </section>
  );
}
