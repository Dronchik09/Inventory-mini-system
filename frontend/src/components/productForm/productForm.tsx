import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productApi";
import styles from "./ProductForm.module.css";

export const ProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [validationError, setValidationError] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setName("");
      setQuantity("");
      setPrice("");
      setValidationError("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError("Назва товару є обов’язковою");
      return;
    }
    if (quantity === "" || quantity < 0) {
      setValidationError("Кількість не може бути від’ємною");
      return;
    }
    if (price === "" || price < 0) {
      setValidationError("Ціна не може бути від’ємною");
      return;
    }

    mutate({
      name: name.trim(),
      quantity: Number(quantity),
      price: Number(price),
    });
  };

  return (
    <div className={styles.formCard}>
      <h3>Додати новий товар</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Назва товару"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Кількість"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Ціна"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={styles.input}
        />
        <button type="submit" disabled={isPending} className={styles.button}>
          {isPending ? "Збереження..." : "Додати"}
        </button>
      </form>
      {validationError && <div className={styles.error}>{validationError}</div>}
    </div>
  );
};
