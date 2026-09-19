import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductForm } from "./components/productForm/productForm";
import { ProductList } from "./components/productList/productList";
import css from "./App.module.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.container}>
        <h1 className={css.title}>Inventory Mini System</h1>
        <ProductForm />
        <ProductList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
