"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../../store/user";
import { useToastStore } from "../../../../store/toast";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { User } from "../../../../types";

export default function AdminUserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  const router = useRouter();
  
  const [mounted, setMounted] = React.useState(false);
  const { users, addUser, updateUser } = useUserStore();
  const { addToast } = useToastStore();
  
  const existingUser = isNew ? null : users.find((usr) => usr.id === resolvedParams.id);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "customer" as "customer" | "admin",
    status: "Active" as "Active" | "Inactive",
  });

  React.useEffect(() => {
    setMounted(true);
    if (existingUser) {
      setFormData({
        name: existingUser.name || `${existingUser.firstName || ''} ${existingUser.lastName || ''}`.trim() || "",
        email: existingUser.email || "",
        role: existingUser.role || "customer",
        status: existingUser.status || "Active",
      });
    }
  }, [existingUser]);

  if (!mounted) return null;

  if (!isNew && !existingUser) {
    return (
      <div className="min-h-screen p-10 text-center space-y-4">
        <h1 className="text-xl font-bold">User not found</h1>
        <Link href="/admin/users"><Button>Go Back</Button></Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNew) {
      const newId = `USR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      
      addUser({
        id: newId,
        ...formData,
        joinDate: today,
      } as User);
      
      addToast("Customer added successfully!", "success");
    } else {
      updateUser(resolvedParams.id, formData);
      addToast("Customer updated successfully!", "success");
    }

    router.push("/admin/users");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Link href="/admin/users">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{isNew ? "Add New Customer" : "Edit Customer"}</h1>
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
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full flex h-10 rounded-md border border-border/60 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full flex h-10 rounded-md border border-border/60 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/users")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-1.5" />
              {isNew ? "Add Customer" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
