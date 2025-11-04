const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
let AUTH = "";

export function setAuthToken(token) {
  AUTH = token || "";
}

async function req(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (AUTH) headers["Authorization"] = `Bearer ${AUTH}`;
  
  console.log(`API Request: ${method} ${BASE}${path}`, { body, headers });
  
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Para enviar cookies si es necesario
    });
    
    const data = await res.json().catch(() => ({}));
    
    console.log(`API Response: ${res.status}`, data);
    
    if (!res.ok) throw { response: { data, status: res.status } };
    return { data };
  } catch (error) {
    console.error('API Error:', error);
    if (error.response) {
      throw error;
    }
    throw { response: { data: { message: 'Error de conexión' }, status: 0 } };
  }
}

export const api = {
  get: (p) => req(p),
  post: (p, body) => req(p, { method: "POST", body }),
  // Auth
  login: (body) => req("/auth/login", { method: "POST", body }),
  register: (body) => req("/auth/register", { method: "POST", body }),
  // catálogo
  products: () => req("/products"),
  product: (id) => req(`/products/${id}`),
};
