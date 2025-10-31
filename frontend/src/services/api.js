const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
let AUTH = "";

export function setAuthToken(token) {
  AUTH = token || "";
}

async function req(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (AUTH) headers["Authorization"] = `Bearer ${AUTH}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { response: { data, status: res.status } };
  return { data };
}

export const api = {
  get: (p) => req(p),
  post: (p, body) => req(p, { method: "POST", body }),
  // catálogo
  products: () => req("/products"),
  product: (id) => req(`/products/${id}`),
};
