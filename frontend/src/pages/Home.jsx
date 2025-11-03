import Products from "./Products.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO gris suave */}
      <section className="w-full bg-[#d9dde1] py-16 md:py-20 text-center border-b border-slate-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Bienvenido a Ferretería Zona Franca
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium text-[#b86b2a]">
          La compañera de todos tus proyectos
        </p>

      </section>

      {/* GRID de productos */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Productos destacados</h2>
        <Products />
      </section>
    </div>
  );
}