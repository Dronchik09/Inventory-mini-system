import axios from "axios";
import type { Product, CreateProduct, UpdateProduct } from "../types/product";

const API_URL = "http://localhost:4000/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(API_URL);
  return res.data;
};

export const createProduct = async (data: CreateProduct): Promise<Product> => {
  const res = await axios.post<Product>(API_URL, data);
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: UpdateProduct,
): Promise<Product> => {
  const res = await axios.patch<Product>(`${API_URL}/${id}`, data);
  return res.data;
};

export const updateProductQuantity = async (
  id: number,
  quantity: number,
): Promise<Product> => {
  const res = await axios.patch<Product>(`${API_URL}/${id}`, { quantity });
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
