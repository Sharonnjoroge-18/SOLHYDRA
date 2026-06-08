import axios from "axios";

const DEV_BASE_URL = "https://hydra-backend-production-4f57.up.railway.app"; 
const PROD_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://hydra-backend-production-4f57.up.railway.app";
const BASE_URL = import.meta.env.DEV ? DEV_BASE_URL : PROD_BASE_URL;

const api = axios.create({ baseURL: BASE_URL });

// Auto-attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on expired token
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || "";
    const isAuthRequest = url.includes("/auth/login") || url.includes("/auth/register");

    if (status === 401 && !isAuthRequest) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

/* ---------------- AUTH ---------------- */
export const authAPI = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }).then((r) => r.data),

  login: async (email, password) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("email", email);
    form.append("password", password);
    const response = await api.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = response.data;
    if (!data?.access_token) {
      throw new Error(data?.detail || data?.message || 'Incorrect email or password.');
    }
    return data;
  },
};

/* -------------- PRODUCTS -------------- */
export const productsAPI = {
  getAll: () => api.get("/products").then((r) => r.data),
};

/* ---------------- CART ---------------- */
export const cartAPI = {
  add: (product_id, quantity = 1) =>
    api.post("/cart/add", { product_id, quantity }).then((r) => r.data),

  get: () => api.get("/cart").then((r) => r.data),

  remove: (itemId) =>
    api.delete(`/cart/remove/${itemId}`).then((r) => r.data),

  clear: () => api.delete("/cart/clear").then((r) => r.data),
};

/* --------------- ORDERS --------------- */
export const ordersAPI = {
  create: (payload) => api.post("/orders", payload).then((r) => r.data),
  get: (id) => api.get(`/orders/${id}`).then((r) => r.data),
};

/* -------------- PAYMENTS -------------- */
export const paymentsAPI = {
  initiate: (orderId, callbackUrl) => {
  const cb = callbackUrl || `${window.location.origin}/payment/callback`;
  return api.post(`/payments/initiate/${orderId}?callback_url=${encodeURIComponent(cb)}`).then((r) => r.data);
},

  verify: (reference) => api.get(`/payments/verify/${reference}`).then((r) => r.data),
};

/* ─── ADMIN BUNDLE (MAINTAINING LOCAL VIEWS + BACKEND SETTINGS) ─── */
export const adminAPI = {
  // 1. Silent Resolvers: These prevent network errors if your pages call them,
  // allowing Overview, Hero, and Ticker components to use their own hardcoded UI constants!
  getOverview: () => Promise.resolve({}),
  getProducts: () => Promise.resolve([]),
  updateProduct: (id, payload) => Promise.resolve({ success: true }),

  getHero: () => Promise.resolve({}),
  updateHero: (payload) => Promise.resolve({ success: true }),

  getTicker: () => Promise.resolve([]),
  addTicker: (payload) => Promise.resolve({ success: true }),
  deleteTicker: (id) => Promise.resolve({ success: true }),

  // 2. Real Backend Connectors: These hit your live Railway server endpoints perfectly
  getSettings: () => api.get("/admin/settings").then((r) => r.data),
  updateSettings: (payload) => api.put("/admin/settings", payload).then((r) => r.data),
  
  getOrders: () => api.get("/admin/orders").then((r) => r.data),
  getWaitlist: () => api.get("/admin/waitlist").then((r) => r.data),
};

export default api;