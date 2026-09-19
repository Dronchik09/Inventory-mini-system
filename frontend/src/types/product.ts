export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  createdAt: string;
}

export interface CreateProduct {
  name: string;
  quantity: number;
  price: number;
}

export interface UpdateProduct {
  name?: string;
  price?: number;
  quantity?: number;
}
