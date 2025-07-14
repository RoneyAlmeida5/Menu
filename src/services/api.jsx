import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Funções com token
function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "ngrok-skip-browser-warning": "true",
    },
  };
}

// COMPANY
export const fetchCompany = async () => {
  const response = await api.get("/companies/me", authHeaders());
  return response.data;
};

export const uploadBanner = async (formData) => {
  const response = await api.post("/companies/banner", formData, {
    ...authHeaders(),
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};

export const uploadLogo = async (formData) => {
  const response = await api.put("/companies/logo", formData, {
    ...authHeaders(),
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};

// MENU
export const createMenu = async (menu) => {
  const response = await api.post("/menu", menu, authHeaders());
  return response.data;
};

export const fetchMenus = async () => {
  const response = await api.get("/menu", authHeaders());
  return response.data;
};

export const updateMenu = async (id, menu) => {
  const response = await api.put(`/menu/${id}`, menu, authHeaders());
  return response.data;
};

export const deleteMenu = async (id) => {
  const response = await api.delete(`/menu/${id}`, authHeaders());
  return response.data;
};

// PRODUCTS
export const fetchProducts = async (menuId) => {
  const params = menuId ? { menuId } : {};
  const response = await api.get("/product", {
    ...authHeaders(),
    params,
  });
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post("/product", formData, {
    ...authHeaders(),
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await api.put(`/product/${id}`, formData, {
    ...authHeaders(),
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`, authHeaders());
  return response.data;
};

export async function getProducts() {
  const response = await api.get("/product");
  return response.data;
}

export async function createUser(userData) {
  const response = await api.post("/users", userData);
  return response.data;
}

export const getImageUrl = (path) => {
  if (!path) return "";
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return `${baseURL}${path.startsWith("/") ? path : `/${path}`}`;
};

export default api;
