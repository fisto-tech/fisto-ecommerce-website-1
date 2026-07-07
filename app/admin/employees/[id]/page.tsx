"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmployeeStore } from "../../../../store/employee";
import { useToastStore } from "../../../../store/toast";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { Employee } from "../../../../types";

export default function AdminEmployeeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  const router = useRouter();
  
  const [mounted, setMounted] = React.useState(false);
  const { employees, addEmployee, updateEmployee } = useEmployeeStore();
  const { addToast } = useToastStore();
  
  const existingEmployee = isNew ? null : employees.find((emp) => emp.id === resolvedParams.id);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active" as "Active" | "Inactive",
  });

  React.useEffect(() => {
    setMounted(true);
    if (existingEmployee) {
      setFormData({
        name: existingEmployee.name,
        email: existingEmployee.email,
        role: existingEmployee.role,
        department: existingEmployee.department,
        status: existingEmployee.status,
      });
    }
  }, [existingEmployee]);

  if (!mounted) return null;

  if (!isNew && !existingEmployee) {
    return (
      <div className="min-h-screen p-10 text-center space-y-4">
        <h1 className="text-xl font-bold">Employee not found</h1>
        <Link href="/admin/employees"><Button>Go Back</Button></Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNew) {
      const newId = `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      
      addEmployee({
        id: newId,
        ...formData,
        joinDate: today,
      } as Employee);
      
      addToast("Employee added successfully!", "success");
    } else {
      updateEmployee(resolvedParams.id, formData);
      addToast("Employee updated successfully!", "success");
    }

    router.push("/admin/employees");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Link href="/admin/employees">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{isNew ? "Add New Employee" : "Edit Employee"}</h1>
        </div>
      </div>

      <div className="max-w-2xl border border-border rounded-xl bg-card shadow-sm p-6">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Full Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Jane Doe"
              required 
            />
            <Input 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="jane.doe@fisto.com"
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Role / Title" 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              placeholder="e.g. Sales Associate"
              required 
            />
            <Input 
              label="Department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              placeholder="e.g. Retail Operations"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full flex h-10 rounded-md border border-border/60 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 border-t flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/employees")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-1.5" />
              {isNew ? "Add Employee" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
