import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "../types";
import { promoCodes } from "../mock/data";

interface CartState {
  items: CartItem[];
  discountCode: string;
  discountRate: number;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  clearCart: () => void;
  getTotals: () => { subtotal: number; discount: number; tax: number; total: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: "",
      discountRate: 0,

      addToCart: (product, quantity = 1, selectedColor, selectedSize) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, { product, quantity, selectedColor, selectedSize }] });
        }
      },

      removeFromCart: (productId, selectedColor, selectedSize) => {
        const updatedItems = get().items.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
            )
        );
        set({ items: updatedItems });
      },

      updateQuantity: (productId, quantity, selectedColor, selectedSize) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedColor, selectedSize);
          return;
        }
        const updatedItems = get().items.map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      applyDiscount: (code) => {
        const found = promoCodes.find((p) => p.code.toUpperCase() === code.toUpperCase());
        if (found) {
          set({ discountCode: found.code, discountRate: found.discount });
          return { success: true, message: `Applied ${found.description}` };
        }
        return { success: false, message: "This coupon code is invalid or has expired." };
      },

      clearCart: () => {
        set({ items: [], discountCode: "", discountRate: 0 });
      },

      getTotals: () => {
        const items = get().items;
        const discountRate = get().discountRate;

        const subtotal = items.reduce((acc, item) => {
          const itemPrice = item.product.discountPrice || item.product.price;
          return acc + itemPrice * item.quantity;
        }, 0);

        const discount = subtotal * discountRate;
        const taxableAmount = Math.max(0, subtotal - discount);
        const tax = taxableAmount * 0.1; // 10% tax rate
        const total = taxableAmount + tax;

        return { subtotal, discount, tax, total };
      },
    }),
    {
      name: "fisto-cart-storage",
    }
  )
);
