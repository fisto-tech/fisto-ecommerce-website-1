import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "../types";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  requestRefund: (orderId: string) => { success: boolean; message: string };
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      requestRefund: (orderId) => {
        const order = get().orders.find((o) => o.id === orderId);
        
        if (!order) {
          return { success: false, message: "Order not found" };
        }
        
        if (order.status !== "delivered") {
          return { success: false, message: "Refund can only be requested for delivered orders" };
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: "refund_requested" as any } : o
          ),
        }));
        
        return { success: true, message: "Refund requested successfully" };
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: "fisto-orders-storage",
    }
  )
);
