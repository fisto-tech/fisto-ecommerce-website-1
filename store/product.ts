import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";
import { mockProducts as initialProducts } from "../mock/data";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      // By default, start with the mock data if local storage is empty
      products: initialProducts,

      setProducts: (products) => set({ products }),

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      resetToDefault: () => {
        set({ products: initialProducts });
      },
    }),
    {
      name: "fisto-products-storage",
    }
  )
);
