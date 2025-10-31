import CheckoutButton from "../components/CheckoutButton.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const { items, remove, clear, totalItems, totalPrice } = useCart();
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-3 border rounded-xl p-3">
                <img src={it.imageUrl} alt={it.title} className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-slate-600">x{it.quantity}</div>
                </div>
                <div className="font-semibold">
                  ${(it.quantity * it.price).toLocaleString("es-CL")}
                </div>
                <button className="ml-3 text-sm px-2 py-1 rounded-lg border" onClick={() => remove(it.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <div>Total items: {totalItems()}</div>
            <div className="text-lg font-semibold">
              Total: ${totalPrice().toLocaleString("es-CL")}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 rounded-lg border" onClick={clear}>Vaciar</button>
            <CheckoutButton />
          </div>
        </>
      )}
    </section>
  );
}
