import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-brand-800 to-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">Ferretería Zona Franca</h3>
          <p className="mt-2 text-sm text-brand-100">
            Herramientas, materiales y soluciones para tu proyecto.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-100">Dirección & Horario</h4>
          <ul className="mt-3 space-y-1 text-sm">
            <li>📍 Av. Principal 1234, San Bernardo</li>
            <li>🕒 Lun–Vie: 09:00–19:00</li>
            <li>🕒 Sábado: 10:00–16:00</li>
            <li>🕒 Domingo: Cerrado</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-100">Contacto</h4>
          <ul className="mt-3 space-y-1 text-sm">
            <li>📞 +56 9 1234 5678</li>
            <li>✉️ contacto@zonafranca.cl</li>
            <li className="flex gap-3 pt-2">
              {/* Íconos simples en SVG para evitar dependencias */}
              <a className="opacity-90 hover:opacity-100" href="#" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10Zm6.5.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/></svg>
              </a>
              <a className="opacity-90 hover:opacity-100" href="#" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.7-3.9c1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12H16l-.5 3h-2.1v7A10 10 0 0 0 22 12Z"/></svg>
              </a>
              <a className="opacity-90 hover:opacity-100" href="#" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4.9A10 10 0 0 0 4.2 19.7L3 22.9l3.3-1.2A10 10 0 0 0 20 4.9Zm-8 14.5a8.4 8.4 0 0 1-4.3-1.2l-.3-.2l-2.6.9l.9-2.5l-.2-.3A8.4 8.4 0 1 1 12 19.4Zm4.7-6.2c-.3-.1-1.8-.9-2-.9s-.4 0-.6.3c-.2.3-.7.9-.8 1c-.2.2-.3.2-.6.1c-.3-.1-1.2-.5-2.3-1.5c-.8-.7-1.4-1.7-1.6-2c-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.4.3-.6s0-.4 0-.6s-.6-1.5-.8-2.1c-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.1 3.3 5.1 4.6c.7.3 1.2.5 1.6.6c.7.2 1.3.2 1.8.1c.6-.1 1.8-.7 2-1.4c.2-.7.2-1.3.1-1.4c-.1-.2-.2-.2-.5-.3Z"/></svg>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-100">Suscríbete</h4>
          <p className="mt-2 text-sm text-brand-100">Novedades y ofertas en tu correo.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = "/suscribirse"; }}
            className="mt-3 flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full rounded-xl bg-white/90 px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button className="rounded-xl bg-accent-500 px-4 py-2 font-semibold text-brand-900 hover:bg-accent-400">
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-brand-100 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Ferretería Zona Franca</span>
          <span>Proyecto 7</span>
        </div>
      </div>
    </footer>
  );
}
