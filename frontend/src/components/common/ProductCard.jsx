export default function ProductCard({ product, onAdd }) {
  const { name, price, description, stock, img } = product;

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-50">
        <img
          src={img || "/logo.jpeg"}
          alt={name}
          className="h-full w-full object-contain p-4 transition group-hover:scale-[1.02]"
          onError={(e) => { e.currentTarget.src = "/logo.jpeg"; }}
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{name}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{description}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${price?.toLocaleString("es-CL")}
          </span>

          {stock > 0 ? (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              En stock
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
              Sin stock
            </span>
          )}
        </div>

        <button
          onClick={() => onAdd(product)}
          disabled={stock <= 0}
          className="mt-2 w-full rounded-lg bg-brand-600 py-2 text-sm font-medium text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Agregar al carro
        </button>
      </div>
    </div>
  );
}
