const BASE_URL = import.meta.env.VITE_API_URL;

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  get: (p) => http(p),
  post: (p, body) => http(p, { method: "POST", body: JSON.stringify(body) }),
  products: () => http("/api/products"),
};
