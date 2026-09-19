import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/product";
import {
  getProducts,
  updateProductQuantity,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";
import { EditProductModal } from "../editProductModal/editProductModal";
import styles from "./ProductList.module.css";

export const ProductList: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateProductQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name: string; price: number; quantity: number };
    }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <div>Завантаження товарів...</div>;
  if (isError)
    return <div style={{ color: "red" }}>Помилка завантаження даних!</div>;

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return (
          <span className={`${styles.badge} ${styles.inStock}`}>In Stock</span>
        );
      case "low_stock":
        return (
          <span className={`${styles.badge} ${styles.lowStock}`}>
            Low Stock
          </span>
        );
      case "out_of_stock":
        return (
          <span className={`${styles.badge} ${styles.outOfStock}`}>
            Out of Stock
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className={styles.listCard}>
      {products && products.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Ціна ($)</th>
              <th>Кількість</th>
              <th>Статус</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>
                  <div className={styles.qtyControls}>
                    <button
                      className={styles.qtyButton}
                      onClick={() =>
                        p.quantity > 0 &&
                        updateQuantityMutation.mutate({
                          id: p.id,
                          quantity: p.quantity - 1,
                        })
                      }
                      disabled={p.quantity <= 0}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{p.quantity}</span>
                    <button
                      className={styles.qtyButton}
                      onClick={() =>
                        updateQuantityMutation.mutate({
                          id: p.id,
                          quantity: p.quantity + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{renderStatusBadge(p.status)}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setEditingProduct(p)}
                      style={{
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(p.id)}
                      className={styles.deleteButton}
                    >
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.empty}>
          Товари відсутні. Додайте перший товар вище.
        </div>
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(id, data) => editMutation.mutate({ id, data })}
          isLoading={editMutation.isPending}
        />
      )}
    </div>
  );
};
