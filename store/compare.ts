import { create } from "zustand";
import { Product } from "../types";

interface CompareState {
  compareItems: Product[];
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()((set, get) => ({
  compareItems: [],

  addToCompare: (product) => {
    const current = get().compareItems;
    if (current.find((p) => p.id === product.id)) {
      return { success: false, message: `${product.name} is already in comparison.` };
    }
    if (current.length >= 3) {
      return { success: false, message: "You can compare up to 3 products at a time." };
    }
    set({ compareItems: [...current, product] });
    return { success: true, message: `${product.name} added to comparison.` };
  },

  removeFromCompare: (productId) => {
    set((state) => ({
      compareItems: state.compareItems.filter((p) => p.id !== productId),
    }));
  },

  clearCompare: () => set({ compareItems: [] }),
}));
