import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function getProducts() {
  const response = await api.get("/products");
  return response.data;
}

export async function createUser(userData) {
  const response = await api.post("/users", userData);
  return response.data;
}
