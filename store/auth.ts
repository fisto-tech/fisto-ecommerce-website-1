import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Address } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  register: (firstName: string, lastName: string, email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: { firstName: string; lastName: string; phone?: string; address?: Address }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email) => {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Create a mock user based on email prefix
        const namePart = email.split("@")[0];
        const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        
        const mockUser: User = {
          id: "usr-" + Math.random().toString(36).substr(2, 9),
          email,
          firstName,
          lastName: "Customer",
          phone: "+1 (555) 019-2834",
          address: {
            name: `${firstName} Customer`,
            addressLine1: "120 Vercel Way",
            addressLine2: "Suite 400",
            city: "San Francisco",
            state: "CA",
            postalCode: "94107",
            country: "United States",
          },
        };

        set({ user: mockUser, isAuthenticated: true });
        return { success: true, message: "Logged in successfully" };
      },

      register: async (firstName, lastName, email) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser: User = {
          id: "usr-" + Math.random().toString(36).substr(2, 9),
          email,
          firstName,
          lastName,
          phone: "",
        };

        set({ user: mockUser, isAuthenticated: true });
        return { success: true, message: "Registered successfully" };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              address: data.address,
            },
          };
        });
      },
    }),
    {
      name: "fisto-auth-storage",
    }
  )
);
