import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const defaultUsers: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "customer",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    role: "customer",
    status: "Active",
    joinDate: "2024-03-22",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "michael.admin@fisto.com",
    role: "admin",
    status: "Active",
    joinDate: "2023-06-10",
  }
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: defaultUsers,
      
      setUsers: (users) => set({ users }),
      
      addUser: (user) => {
        set((state) => ({
          users: [...state.users, user],
        }));
      },
      
      updateUser: (id, updatedUser) => {
        set((state) => ({
          users: state.users.map((usr) => 
            usr.id === id ? { ...usr, ...updatedUser } : usr
          ),
        }));
      },
      
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((usr) => usr.id !== id),
        }));
      }
    }),
    {
      name: "fisto-users-storage",
    }
  )
);
