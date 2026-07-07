import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) => {
        const currentItems = get().items;
        if (!currentItems.some((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      toggleWishlist: (product) => {
        const isIn = get().isInWishlist(product.id);
        if (isIn) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "fisto-wishlist-storage",
    }
  )
);
