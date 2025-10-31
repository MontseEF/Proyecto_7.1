import ProductCard from "../components/ProductCard.jsx";

const products = [
  {
    name: "Taladro Percutor",
    price: 54990,
    stock: 4,
    img: "/taladro.png",
    description: "Taladro percutor 800W, 2 velocidades. Ideal para hormigón, metal y madera.",
  },
  {
    name: "Martillo Carpintero",
    price: 7990,
    stock: 10,
    img: "/martillo.jpg",
    description: "Acero forjado y mango ergonómico antideslizante. Golpes precisos y seguros.",
  },
  {
    name: "Sierra Circular",
    price: 89990,
    stock: 2,
    img: "/sierra-circular.webp",
    description: "Hoja 185mm, 1400W. Cortes rápidos y limpios en madera.",
  },
  {
    name: "Atornillador Eléctrico",
    price: 24990,
    stock: 6,
    img: "/atornillador.webp",
    description: "Atornillador inalámbrico con batería. Compacto y ligero para uso diario.",
  },
  {
    name: "Saco Cemento 25 kg",
    price: 5990,
    stock: 30,
    img: "/cemento.jpg",
    description: "Cemento gris de alta resistencia. Mezcla homogénea y fraguado confiable.",
  },
  {
    name: "Pintura Látex 1 galón",
    price: 18990,
    stock: 12,
    img: "/pintura.webp",
    description: "Pintura en base a agua para uso interior. Bajo olor y fácil limpieza.",
  },
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
