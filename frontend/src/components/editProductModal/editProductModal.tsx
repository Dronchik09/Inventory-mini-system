import React, { useState } from "react";
import type { Product } from "../../types/product";
import styles from "./EditProductModal.module.css";

interface Props {
  product: Product;
  onClose: () => void;
  onSave: (
    id: number,
    data: { name: string; price: number; quantity: number },
  ) => void;
  isLoading: boolean;
}

export const EditProductModal: React.FC<Props> = ({
  product,
  onClose,
  onSave,
  isLoading,
}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState<number | "">(product.price);
  const [quantity, setQuantity] = useState<number | "">(product.quantity);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Назва обов’язкова");
      return;
    }
    if (price === "" || price < 0) {
      setError("Ціна не може бути від’ємною");
      return;
    }
    if (quantity === "" || quantity < 0) {
      setError("Кількість не може бути від’ємною");
      return;
    }

    onSave(product.id, {
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Редагувати товар</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Назва
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Ціна ($)
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Кількість
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
              className={styles.input}
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.saveBtn}
            >
              {isLoading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
