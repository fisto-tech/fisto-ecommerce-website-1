import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminAuthState {
  isAdminLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      login: () => set({ isAdminLoggedIn: true }),
      logout: () => set({ isAdminLoggedIn: false }),
    }),
    {
      name: "fisto-admin-auth",
    }
  )
);
