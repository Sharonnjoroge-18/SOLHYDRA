import axios from "axios";

const BASE_URL = "https://hydra-backend-production-4f57.up.railway.app";

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
    if (err.response?.status === 401) {
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

  login: (email, password) => {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);
    return api
      .post("/auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((r) => r.data);
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
  initiate: (orderId) =>
    api.post(`/payments/initiate/${orderId}`).then((r) => r.data),

  verify: (reference) =>
    api.get(`/payments/verify/${reference}`).then((r) => r.data),
};

export default api;