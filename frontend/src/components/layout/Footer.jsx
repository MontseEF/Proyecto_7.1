export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Ferretería Zona Franca</p>
        <p className="opacity-80">Proyecto 7</p>
      </div>
    </footer>
  );
}
