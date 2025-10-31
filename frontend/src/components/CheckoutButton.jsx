import { loadStripe } from "@stripe/stripe-js";
import { api } from "../services/api";
import { useCart } from "../contexts/CartContext.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
  const { items } = useCart();

  const pay = async () => {
    const payload = {
      items: items.map(({ title, price, quantity }) => ({
        title,
        price,     // CLP entero (ej: 59990)
        quantity,
      })),
    };

    try {
      const { data } = await api.post("/stripe/create-checkout-session", payload);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (error) console.error(error);
    } catch (e) {
      console.error(e);
      alert("No se pudo iniciar el pago.");
    }
  };

  return (
    <button
      className="rounded-xl px-4 py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={pay}
    >
      Pagar con Stripe
    </button>
  );
}
