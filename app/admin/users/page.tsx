"use client";

import * as React from "react";
import Link from "next/link";
import { useUserStore } from "../../../store/user";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Edit, Trash2, Plus, UserCircle2 } from "lucide-react";
import { useToastStore } from "../../../store/toast";

export default function AdminUsersPage() {
  const [mounted, setMounted] = React.useState(false);
  const { users, deleteUser } = useUserStore();
  const { addToast } = useToastStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleDelete = (id: string, name?: string) => {
    if (confirm(`Are you sure you want to remove user ${name || "Unknown"}?`)) {
      deleteUser(id);
      addToast(`${name || "User"} has been removed.`, "success");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Manage Customers</h1>
            <p className="text-base text-muted-foreground">View, add, or update customer records.</p>
          </div>
        </div>
        <Link href="/admin/users/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Customer
          </Button>
        </Link>
      </div>

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b border-border/50 font-bold tracking-wider uppercase">
              <tr>
                <th className="p-4 text-center w-16">S.No.</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground italic">
                    No customers found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 text-center text-muted-foreground">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground">
                          <UserCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-600' : 'bg-slate-500/10 text-slate-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        user.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-600" 
                          : "bg-red-500/10 text-red-600"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.joinDate}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500" onClick={() => handleDelete(user.id, user.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
