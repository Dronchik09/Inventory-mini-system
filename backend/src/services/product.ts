import { prisma } from "../config/db";
import { calculateProductStatus } from "../utils/statusCalculator";

export class ProductService {
  async getAllProducts() {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async createProduct(data: { name: string; quantity: number; price: number }) {
    const status = calculateProductStatus(data.quantity);
    return prisma.product.create({
      data: {
        name: data.name.trim(),
        quantity: data.quantity,
        price: data.price,
        status,
      },
    });
  }

  async updateProduct(
    id: number,
    data: { name?: string; quantity?: number; price?: number },
  ) {
    const updateData: any = {};

    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }
    if (data.price !== undefined) {
      updateData.price = data.price;
    }
    if (data.quantity !== undefined) {
      updateData.quantity = data.quantity;
      updateData.status = calculateProductStatus(data.quantity);
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}

export const productService = new ProductService();
