export const calculateProductStatus = (quantity: number): string => {
  if (quantity === 0) return "out_of_stock";
  if (quantity >= 1 && quantity <= 5) return "low_stock";
  return "in_stock";
};
