import { Request, Response } from "express";
import { productService } from "../services/product";

export class ProductController {
  async getProducts(_req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name, quantity, price } = req.body;

      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
      }
      const numQuantity = Number(quantity);
      const numPrice = Number(price);

      if (isNaN(numQuantity) || numQuantity < 0) {
        return res.status(400).json({ error: "Quantity cannot be negative" });
      }
      if (isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ error: "Price cannot be negative" });
      }

      const product = await productService.createProduct({
        name,
        quantity: numQuantity,
        price: numPrice,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const { name, quantity, price } = req.body;

      if (
        name !== undefined &&
        (typeof name !== "string" || name.trim() === "")
      ) {
        return res.status(400).json({ error: "Name cannot be empty" });
      }
      if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) {
        return res.status(400).json({ error: "Price cannot be negative" });
      }
      if (
        quantity !== undefined &&
        (isNaN(Number(quantity)) || Number(quantity) < 0)
      ) {
        return res.status(400).json({ error: "Quantity cannot be negative" });
      }

      const updated = await productService.updateProduct(id, {
        name,
        quantity: quantity !== undefined ? Number(quantity) : undefined,
        price: price !== undefined ? Number(price) : undefined,
      });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}

export const productController = new ProductController();
