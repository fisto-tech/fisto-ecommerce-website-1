"use client";

import * as React from "react";
import Link from "next/link";
import { useProductStore } from "../../../store/product";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";
import { useToastStore } from "../../../store/toast";

export default function AdminProductsPage() {
  const [mounted, setMounted] = React.useState(false);
  const { products, deleteProduct } = useProductStore();
  const { addToast } = useToastStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
      addToast(`${name} has been deleted.`, "success");
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
            <h1 className="text-xl font-bold tracking-tight">Manage Products</h1>
            <p className="text-base text-muted-foreground">Add, edit, or remove products from the catalog.</p>
          </div>
        </div>
        <Link href="/admin/products/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b border-border/50 font-bold tracking-wider uppercase">
              <tr>
                <th className="p-4 text-center w-16">S.No.</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground italic">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 text-center text-muted-foreground">{index + 1}</td>
                    <td className="p-4">
                      <div className="h-12 w-12 rounded-md border bg-muted overflow-hidden">
                        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-foreground">
                      <p>{product.name}</p>
                      <p className="text-xs font-normal text-muted-foreground font-mono">{product.id}</p>
                    </td>
                    <td className="p-4 font-bold">
                      {product.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-emerald-600">{formatPrice(product.discountPrice)}</span>
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
                        </div>
                      ) : (
                        <span>{formatPrice(product.price)}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600">
                        Active
                      </span>
                    </td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500" onClick={() => handleDelete(product.id, product.name)}>
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
