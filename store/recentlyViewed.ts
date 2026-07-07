import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

interface RecentlyViewedState {
  items: Product[];
  addProduct: (product: Product) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      addProduct: (product) => {
        const currentItems = get().items;
        // Filter out if already in list, then prepend, capping at 6 items
        const filtered = currentItems.filter((item) => item.id !== product.id);
        set({ items: [product, ...filtered].slice(0, 6) });
      },
    }),
    {
      name: "fisto-recently-viewed",
    }
  )
);
