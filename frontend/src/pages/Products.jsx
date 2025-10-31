import ProductCard from "../components/ProductCard.jsx";

const products = [
  { name: "Taladro Percutor", price: 54990, stock: 4, img: "/taladro.png", description: "800W – uso profesional" },
  { name: "Martillo Carpintero", price: 7990, stock: 10, img: "/martillo.jpg", description: "Acero forjado, mango ergonómico" },
  { name: "Sierra Circular", price: 89990, stock: 2, img: "/sierra-circular.webp", description: "185mm, 1400W" },
  { name: "Atornillador", price: 24990, stock: 6, img: "/atornillador.webp", description: "Eléctrico con batería" },
  { name: "Saco Cemento 25kg", price: 5990, stock: 30, img: "/cemento.jpg", description: "Cemento gris alta calidad" },
  { name: "Pintura Latex 1 galón", price: 18990, stock: 12, img: "/pintura.webp", description: "Interior/exterior" },
];

export default function Products() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
}
