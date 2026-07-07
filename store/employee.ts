import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Employee } from "../types";

interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

const defaultEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "John Doe",
    email: "john.doe@fisto.com",
    role: "Store Manager",
    department: "Retail Operations",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "EMP-002",
    name: "Jane Smith",
    email: "jane.smith@fisto.com",
    role: "Customer Support Lead",
    department: "Support",
    status: "Active",
    joinDate: "2024-03-22",
  },
  {
    id: "EMP-003",
    name: "Michael Chen",
    email: "michael.chen@fisto.com",
    role: "Fulfillment Associate",
    department: "Logistics",
    status: "Inactive",
    joinDate: "2025-06-10",
  }
];

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: defaultEmployees,
      
      setEmployees: (employees) => set({ employees }),
      
      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, employee],
        }));
      },
      
      updateEmployee: (id, updatedEmployee) => {
        set((state) => ({
          employees: state.employees.map((emp) => 
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          ),
        }));
      },
      
      deleteEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        }));
      }
    }),
    {
      name: "fisto-employees-storage",
    }
  )
);
